import React, { useState } from 'react';
import { Play, RotateCcw, AlertTriangle, Radio, Activity, Server, ShieldAlert } from 'lucide-react';
import { ClusterNodeState, TelemetryLog } from '../../types/portfolio';
import { INITIAL_CLUSTER_NODES, INITIAL_TELEMETRY } from '../../data/sandboxData';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';

export const InteractiveSandbox: React.FC = () => {
  const [nodes, setNodes] = useState<ClusterNodeState[]>(INITIAL_CLUSTER_NODES);
  const [telemetry, setTelemetry] = useState<TelemetryLog[]>(INITIAL_TELEMETRY);
  const [networkLatency, setNetworkLatency] = useState<number>(35);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [transactionCount, setTransactionCount] = useState<number>(18920);
  const [partitionActive, setPartitionActive] = useState<boolean>(false);

  // Helper to append a telemetry log
  const addLog = (level: TelemetryLog['level'], message: string) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
    const newLog: TelemetryLog = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: timeStr,
      level,
      message
    };
    setTelemetry((prev) => [newLog, ...prev.slice(0, 15)]);
  };

  // Toggle individual node state
  const toggleNode = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((node) => {
        if (node.id !== nodeId) return node;
        const isOffline = node.role === 'OFFLINE';
        const newRole = isOffline ? 'FOLLOWER' : 'OFFLINE';
        const newStatus = isOffline ? 'healthy' : 'down';
        addLog(
          isOffline ? 'INFO' : 'WARN',
          `Node [${node.name}] manual state toggle: ${newRole}`
        );
        return {
          ...node,
          role: newRole,
          status: newStatus
        };
      })
    );
  };

  // Submit client transaction and watch consensus replication
  const executeTransaction = () => {
    const leader = nodes.find((n) => n.role === 'LEADER');
    if (!leader) {
      addLog('WARN', 'Transaction REJECTED: No active leader in cluster. Election required.');
      return;
    }

    setIsSimulating(true);
    const newIndex = transactionCount + 1;
    setTransactionCount(newIndex);

    addLog('INFO', `Client RPC -> Ingress on ${leader.name}: SET state_key = 0x${Math.floor(Math.random() * 0xFFFFF).toString(16)} (Index: ${newIndex})`);

    // Simulate replication delay based on network latency
    setTimeout(() => {
      const quorumRequired = Math.floor(nodes.length / 2) + 1;
      const totalHealthy = nodes.filter((n) => n.status === 'healthy').length;

      if (totalHealthy >= quorumRequired) {
        setNodes((prev) =>
          prev.map((n) =>
            n.status === 'healthy' ? { ...n, commitIndex: newIndex } : n
          )
        );
        addLog('INFO', `WAL Replicated across ${totalHealthy}/5 nodes. Quorum achieved. Commit [Index ${newIndex}] durable.`);
      } else {
        addLog('WARN', `Quorum FAILED! Only ${totalHealthy}/5 nodes reachable (Required: ${quorumRequired}). Rollback triggered.`);
      }
      setIsSimulating(false);
    }, networkLatency * 4);
  };

  // Force leader failover & Raft election
  const triggerFailover = () => {
    const currentLeader = nodes.find((n) => n.role === 'LEADER');
    if (!currentLeader) return;

    addLog('WARN', `FAILURE INJECTED: Terminating Leader [${currentLeader.name}]...`);

    // Step 1: Mark leader down
    setNodes((prev) =>
      prev.map((n) =>
        n.id === currentLeader.id
          ? { ...n, role: 'OFFLINE', status: 'down' }
          : { ...n, role: 'CANDIDATE', term: n.term + 1 }
      )
    );

    // Step 2: Elect new leader among active followers
    setTimeout(() => {
      setNodes((prev) => {
        const eligible = prev.filter((n) => n.id !== currentLeader.id && n.status !== 'down');
        if (eligible.length === 0) {
          addLog('WARN', 'Cluster in total blackout. No nodes available to form quorum.');
          return prev;
        }

        const newLeaderNode = eligible[0];
        const newTerm = newLeaderNode.term;

        addLog('ELECT', `Candidate [${newLeaderNode.name}] collected ${eligible.length} votes. Elected LEADER for Term ${newTerm}.`);

        return prev.map((n) => {
          if (n.id === currentLeader.id) return n;
          if (n.id === newLeaderNode.id) {
            return { ...n, role: 'LEADER', status: 'healthy' };
          }
          return { ...n, role: 'FOLLOWER', status: 'healthy', term: newTerm };
        });
      });
    }, networkLatency * 3 + 200);
  };

  // Simulate network split partition
  const togglePartition = () => {
    setPartitionActive(!partitionActive);
    if (!partitionActive) {
      addLog('WARN', 'SPLIT-BRAIN ISOLATION: Nodes partitioned into Minority (US) and Majority (EU/AP).');
      setNodes((prev) =>
        prev.map((n, idx) =>
          idx < 2 ? { ...n, status: 'down' } : { ...n, status: 'healthy' }
        )
      );
    } else {
      addLog('INFO', 'Network partition resolved. Cluster healing in progress...');
      setNodes(INITIAL_CLUSTER_NODES);
    }
  };

  // Reset simulation to original baseline
  const resetCluster = () => {
    setNodes(INITIAL_CLUSTER_NODES);
    setTelemetry(INITIAL_TELEMETRY);
    setTransactionCount(18920);
    setPartitionActive(false);
    addLog('INFO', 'Cluster topology restored to baseline state.');
  };

  return (
    <section id="sandbox" className="py-24 bg-[#0a0f1d] border-b border-border/70 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Live Interactive Showcase"
          title="Distributed Consensus & Cluster Resiliency Sandbox"
          subtitle="Interact directly with a real-time Raft consensus simulation. Inject network partitions, trigger leader failovers, and observe write-ahead log replication across peer nodes."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Cluster Topology (7 Cols) */}
          <div className="lg:col-span-7 bg-card rounded-2xl border border-border p-6 sm:p-7 space-y-6">
            
            {/* Header & Status Indicator */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/70">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted text-accent">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-base font-bold text-foreground">
                    Cluster Topology (Raft v2 Engine)
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground">
                    5 Active Nodes • Quorum Threshold: 3 Nodes
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-muted-foreground">Term:</span>
                <span className="text-accent font-bold px-2 py-0.5 rounded bg-muted">
                  {nodes[0]?.term || 14}
                </span>
                <span className="text-muted-foreground ml-2">Commit Index:</span>
                <span className="text-foreground font-bold px-2 py-0.5 rounded bg-muted">
                  {transactionCount}
                </span>
              </div>
            </div>

            {/* Nodes Interactive Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {nodes.map((node) => {
                const isLeader = node.role === 'LEADER';
                const isOffline = node.role === 'OFFLINE' || node.status === 'down';
                const isCandidate = node.role === 'CANDIDATE';

                return (
                  <div
                    key={node.id}
                    onClick={() => toggleNode(node.id)}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none relative overflow-hidden ${
                      isLeader
                        ? 'bg-emerald-950/20 border-accent shadow-glow-sm'
                        : isOffline
                        ? 'bg-red-950/15 border-red-900/50 opacity-60'
                        : isCandidate
                        ? 'bg-amber-950/20 border-amber-600/50'
                        : 'bg-[#121927] border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    {/* Node Top bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            isLeader
                              ? 'bg-accent animate-ping-slow'
                              : isOffline
                              ? 'bg-red-500'
                              : 'bg-cyan-400'
                          }`}
                        />
                        <span className="font-mono text-xs font-bold text-foreground">
                          {node.name}
                        </span>
                      </div>
                      <span
                        className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          isLeader
                            ? 'bg-accent text-background'
                            : isOffline
                            ? 'bg-red-500/20 text-red-400'
                            : isCandidate
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {node.role}
                      </span>
                    </div>

                    {/* Node Specs */}
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border/40 font-mono text-[11px] text-muted-foreground">
                      <div>IP: <span className="text-slate-300">{node.ip}</span></div>
                      <div>RTT: <span className="text-slate-300">{node.latencyMs}ms</span></div>
                      <div>Index: <span className="text-accent font-semibold">{node.commitIndex}</span></div>
                      <div>CPU: <span className="text-slate-300">{node.cpuLoadPercent}%</span></div>
                    </div>

                    <div className="text-[10px] font-mono text-slate-500 mt-2 text-right">
                      Click to {isOffline ? 'revive node' : 'simulate failure'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sandbox Simulation Controls */}
            <div className="pt-2 border-t border-border/60 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={executeTransaction}
                    disabled={isSimulating}
                    icon={<Play className="w-3.5 h-3.5" />}
                  >
                    {isSimulating ? 'Replicating...' : 'Write Transaction (SET)'}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={triggerFailover}
                    icon={<AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                  >
                    Kill Leader
                  </Button>

                  <Button
                    variant={partitionActive ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={togglePartition}
                    icon={<ShieldAlert className="w-3.5 h-3.5" />}
                  >
                    {partitionActive ? 'Heal Split-Brain' : 'Split-Brain Test'}
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetCluster}
                  icon={<RotateCcw className="w-3.5 h-3.5" />}
                >
                  Reset
                </Button>
              </div>

              {/* Latency Slider */}
              <div className="flex items-center gap-4 bg-[#121927] p-3 rounded-lg border border-slate-800 font-mono text-xs">
                <span className="text-muted-foreground shrink-0 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-accent" />
                  Simulated Network RTT:
                </span>
                <input
                  type="range"
                  min="10"
                  max="150"
                  value={networkLatency}
                  onChange={(e) => setNetworkLatency(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                  aria-label="Simulated network latency"
                />
                <span className="font-bold text-accent min-w-[45px] text-right">
                  {networkLatency}ms
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Real-time Telemetry & Consensus Log (5 Cols) */}
          <div className="lg:col-span-5 bg-card rounded-2xl border border-border p-6 sm:p-7 flex flex-col h-[560px]">
            
            <div className="flex items-center justify-between pb-4 border-b border-border/70">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-accent animate-pulse" />
                <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-wider">
                  Real-Time Cluster Telemetry
                </h4>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-emerald-400">
                LIVE
              </span>
            </div>

            {/* Log Stream Area */}
            <div className="flex-1 overflow-y-auto font-mono text-xs space-y-2 py-3 pr-1 text-slate-300">
              {telemetry.map((log) => {
                const isWarn = log.level === 'WARN';
                const isElect = log.level === 'ELECT';
                const isHeartbeat = log.level === 'HEARTBEAT';

                return (
                  <div
                    key={log.id}
                    className="p-2 rounded bg-[#0e1524] border border-slate-800/80 leading-relaxed animate-fadeIn"
                  >
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                      <span>{log.timestamp}</span>
                      <span
                        className={`font-bold ${
                          isWarn
                            ? 'text-red-400'
                            : isElect
                            ? 'text-amber-400'
                            : isHeartbeat
                            ? 'text-cyan-400'
                            : 'text-accent'
                        }`}
                      >
                        [{log.level}]
                      </span>
                    </div>
                    <div className="text-slate-300 text-[11px] break-words font-mono">
                      {log.message}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Micro Benchmark Footer */}
            <div className="pt-3 border-t border-border/70 font-mono text-[11px] text-muted-foreground flex items-center justify-between">
              <span>Safety Guarantee:</span>
              <span className="text-emerald-400 font-bold">Strong Consistency (CP)</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
