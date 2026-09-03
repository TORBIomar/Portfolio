import { ClusterNodeState, TelemetryLog } from '../types/portfolio';

export const INITIAL_CLUSTER_NODES: ClusterNodeState[] = [
  {
    id: "node-1",
    name: "node-alpha-us-east",
    ip: "10.0.1.12",
    role: "LEADER",
    status: "healthy",
    term: 14,
    commitIndex: 18920,
    latencyMs: 12,
    cpuLoadPercent: 34
  },
  {
    id: "node-2",
    name: "node-bravo-us-west",
    ip: "10.0.1.15",
    role: "FOLLOWER",
    status: "healthy",
    term: 14,
    commitIndex: 18920,
    latencyMs: 38,
    cpuLoadPercent: 21
  },
  {
    id: "node-3",
    name: "node-charlie-eu-central",
    ip: "10.0.2.20",
    role: "FOLLOWER",
    status: "healthy",
    term: 14,
    commitIndex: 18920,
    latencyMs: 76,
    cpuLoadPercent: 28
  },
  {
    id: "node-4",
    name: "node-delta-ap-southeast",
    ip: "10.0.3.44",
    role: "FOLLOWER",
    status: "healthy",
    term: 14,
    commitIndex: 18919,
    latencyMs: 145,
    cpuLoadPercent: 19
  },
  {
    id: "node-5",
    name: "node-echo-sa-east",
    ip: "10.0.4.88",
    role: "FOLLOWER",
    status: "healthy",
    term: 14,
    commitIndex: 18920,
    latencyMs: 118,
    cpuLoadPercent: 22
  }
];

export const INITIAL_TELEMETRY: TelemetryLog[] = [
  { id: "log-1", timestamp: "16:24:01.102", level: "INFO", message: "Cluster quorum established (5/5 nodes active)." },
  { id: "log-2", timestamp: "16:24:02.341", level: "HEARTBEAT", message: "Leader node-alpha dispatched Heartbeat (Term: 14, Index: 18920)." },
  { id: "log-3", timestamp: "16:24:03.490", level: "INFO", message: "Replication ack received from node-bravo, node-charlie (Quorum achieved)." },
  { id: "log-4", timestamp: "16:24:04.118", level: "INFO", message: "Commit index incremented to 18920 across all replicas." }
];
