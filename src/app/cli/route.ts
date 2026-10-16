import { NextResponse } from "next/server";

export async function GET() {
  const reset = "\x1b[0m";
  const bold = "\x1b[1m";
  const dim = "\x1b[2m";
  const terracotta = "\x1b[38;2;255;176;161m";
  const white = "\x1b[38;2;255;255;255m";
  const gray = "\x1b[38;2;161;161;170m";
  const green = "\x1b[38;2;74;222;128m";

  const banner = `
${terracotta}╭──────────────────────────────────────────────────────────────────────────╮${reset}
${terracotta}│${reset}  ${bold}${white}OMAR TORBI${reset}  ${dim}${gray}// Software & DevOps Engineer${reset}                      ${terracotta}│${reset}
${terracotta}├──────────────────────────────────────────────────────────────────────────┤${reset}
${terracotta}│${reset}  ${bold}${terracotta}Role:${reset}      Software & DevOps Engineer                                  ${terracotta}│${reset}
${terracotta}│${reset}  ${bold}${terracotta}School:${reset}    EMSI Rabat — State Engineering Degree (DDSI, Class of 2027) ${terracotta}│${reset}
${terracotta}│${reset}  ${bold}${terracotta}Certs:${reset}     Java SE 17 Pro (1Z0-829) · OCI DevOps Pro · OCI Arch Pro    ${terracotta}│${reset}
${terracotta}│${reset}  ${bold}${terracotta}Stack:${reset}     Spring Boot 3 · Docker & Linux · OCI · Three.js & Wasm      ${terracotta}│${reset}
${terracotta}│${reset}  ${bold}${terracotta}Focus:${reset}     Modular Backend Architecture · Clean Code · Zero Defect     ${terracotta}│${reset}
${terracotta}│${reset}  ${bold}${terracotta}Based:${reset}     Rabat / Béni Mellal, Morocco                                ${terracotta}│${reset}
${terracotta}│${reset}  ${bold}${terracotta}Status:${reset}    ${green}●${reset} Available for PFE Internship (Feb 2027) & Full-Time       ${terracotta}│${reset}
${terracotta}├──────────────────────────────────────────────────────────────────────────┤${reset}
${terracotta}│${reset}  ${bold}${white}Links:${reset}     https://omartorbi.engineer                                  ${terracotta}│${reset}
${terracotta}│${reset}             github.com/TORBIomar  ·  linkedin.com/in/omar-torbi         ${terracotta}│${reset}
${terracotta}╰──────────────────────────────────────────────────────────────────────────╯${reset}
`;

  return new NextResponse(banner, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
