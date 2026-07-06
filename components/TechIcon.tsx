import React from 'react';
import { 
  SiPython, 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiMongodb, 
  SiPostgresql, 
  SiGit, 
  SiVercel, 
  SiOpenai, 
  SiGithub, 
  SiTensorflow, 
  SiFastapi, 
  SiD3, 
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiGooglecloud,
  SiDocker,
  SiFirebase,
  SiSupabase,
  SiFigma,
  SiLinux,
  SiGithubactions,
  SiTerraform,
  SiGraphql,
  SiRedis
} from 'react-icons/si';

const N8nIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" style={{ display: 'inline-block' }}>
    <circle cx="6" cy="12" r="4.5" fill="#FF6C37" />
    <circle cx="18" cy="6" r="3.5" fill="#FF6C37" />
    <circle cx="18" cy="18" r="3.5" fill="#FF6C37" />
    <line x1="6" y1="12" x2="18" y2="6" stroke="#FF6C37" strokeWidth="2.5" />
    <line x1="6" y1="12" x2="18" y2="18" stroke="#FF6C37" strokeWidth="2.5" />
  </svg>
);

const NeonIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="#00E599" style={{ display: 'inline-block' }}>
    <path d="M12 2L2 22h20L12 2zm0 4.5L18.5 19H5.5L12 6.5z" />
  </svg>
);

const FramerIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="#0055FF" style={{ display: 'inline-block' }}>
    <path d="M0 0h12l12 12H12L0 0zm0 12h12l12 12H0V12z" />
  </svg>
);

const LangChainIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="#F8C630" style={{ display: 'inline-block' }}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <path d="M7 12h10M7 8h10M7 16h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const WebSocketIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="#E10098" style={{ display: 'inline-block' }}>
    <path d="M12 2L2 14h9v8l10-12h-9z" />
  </svg>
);

const AwsIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="#FF9900" style={{ display: 'inline-block' }}>
    <path d="M16.586 16.98c-.687.58-1.577.838-2.485.838-1.745 0-3.178-1.077-3.178-3.08 0-2.395 1.986-2.955 4.414-2.955h1.2v-.495c0-.98-.447-1.57-1.632-1.57-.893 0-1.787.31-2.485.85a.398.398 0 0 1-.58-.06L11.2 8.527a.4.4 0 0 1 .054-.505c1.168-1.02 2.766-1.5 4.545-1.5 3.057 0 4.793 1.62 4.793 4.673v5.267c0 .762.062 1.343.197 1.83a.401.401 0 0 1-.295.495l-1.95.42a.417.417 0 0 1-.462-.266c-.198-.46-.282-.94-.323-1.46zm-.05-3.88h-1.02c-1.393 0-2.42.274-2.42 1.564 0 .937.588 1.488 1.558 1.488.75 0 1.442-.36 1.882-1.024v-2.028zM12.023.774a.403.403 0 0 0-.488-.07L5.59 3.655a.4.4 0 0 0-.214.397v1.895a.4.4 0 0 0 .564.364l1.905-.884c.083-.038.176-.035.257.01l4.02 2.222a.402.402 0 0 0 .578-.36V6.03a.402.402 0 0 0-.22-.36L9.697 4.148c-.08-.043-.13-.127-.13-.218v-.954c0-.092.05-.176.13-.22L12.07.973a.402.402 0 0 0-.047-.2zM21.144 20.25c-3.14 2.37-7.79 3.73-11.758 3.73-5.367 0-9.255-2.06-9.356-2.122a.394.394 0 0 1-.1-.537l.873-1.282a.41.41 0 0 1 .53-.135c.1.06 3.666 2.06 8.056 2.06 3.518 0 7.8-1.21 10.6-3.23a.403.403 0 0 1 .58.115l.69 1.077c.108.17.067.394-.117.534zM23.013 18.73c-.22-.284-.962-.163-1.32-.12a.41.41 0 0 0-.315.547c.228.61.802 1.93.593 2.193-.207.26-1.512-.132-2.1-.284a.4.4 0 0 0-.487.3l-.3.947c-.086.27.18.528.43.435 1.543-.578 3.582-1.7 3.864-2.054a.415.415 0 0 0-.365-.964z" />
  </svg>
);

const VsCodeIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="#007ACC" style={{ display: 'inline-block' }}>
    <path d="M23.984 6.802a.669.669 0 00-.236-.425L18.067.8a.68.68 0 00-.77.067l-7.79 6.27-5.18-3.954a.684.684 0 00-.79-.015L.302 5.584a.68.68 0 00-.285.556v11.72a.68.68 0 00.285.555l3.23 2.416a.681.681 0 00.79-.015l5.18-3.953 7.79 6.27a.68.68 0 00.77.066l5.68-5.577a.68.68 0 00.237-.425v-10.4a.663.663 0 00-.001-.017zm-14.773 8.35L5.438 12l3.773-3.152v6.304zM16.634 3.01l4.5 4.417-10.518 8.47v-8.47l10.018-4.417zM4.093 17.584l-2.61-1.954V8.37l2.61-1.953v11.167zm12.54 3.407l-10.017-4.418v-8.47l10.517 8.47-4.5 4.418zM22.62 17.39l-4.5 4.418V2.19l4.5 4.418v10.782z" />
  </svg>
);

export function getTechIcon(tech: string) {
  const t = tech.toLowerCase().trim();
  switch (t) {
    case 'python': return <SiPython color="#3776AB" />;
    case 'javascript': return <SiJavascript color="#F7DF1E" />;
    case 'typescript': return <SiTypescript color="#3178C6" />;
    case 'react':
    case 'react.js': return <SiReact color="#61DAFB" />;
    case 'next.js': return <SiNextdotjs color="#000000" />;
    case 'node.js': return <SiNodedotjs color="#339933" />;
    case 'mongodb': return <SiMongodb color="#47A248" />;
    case 'postgresql': return <SiPostgresql color="#4169E1" />;
    case 'git': return <SiGit color="#F05032" />;
    case 'n8n': return <N8nIcon />;
    case 'vercel': return <SiVercel color="#000000" />;
    case 'openai codex':
    case 'openai':
    case 'gpt-4': return <SiOpenai color="#10A37F" />;
    case 'github api':
    case 'github': return <SiGithub color="#181717" />;
    case 'langchain': return <LangChainIcon />;
    case 'tensorflow': return <SiTensorflow color="#FF6F00" />;
    case 'fastapi': return <SiFastapi color="#009688" />;
    case 'd3.js':
    case 'd3': return <SiD3 color="#F9A03F" />;
    case 'websocket': return <WebSocketIcon />;
    case 'tailwind css': return <SiTailwindcss color="#06B6D4" />;
    case 'neon': return <NeonIcon />;
    case 'framer motion': return <FramerIcon />;
    case 'html/css':
    case 'html': return <SiHtml5 color="#E34F26" />;
    case 'css': return <SiCss color="#1572B6" />;
    case 'aws': return <AwsIcon />;
    case 'gcp': return <SiGooglecloud color="#4285F4" />;
    case 'docker': return <SiDocker color="#2496ED" />;
    case 'firebase': return <SiFirebase color="#FFCA28" />;
    case 'supabase': return <SiSupabase color="#3ECF8E" />;
    case 'figma': return <SiFigma color="#F24E1E" />;
    case 'linux': return <SiLinux color="#FCC624" />;
    case 'vs code': return <VsCodeIcon />;
    case 'github actions': return <SiGithubactions color="#2088FF" />;
    case 'terraform': return <SiTerraform color="#7B42BC" />;
    case 'graphql': return <SiGraphql color="#E10098" />;
    case 'redis': return <SiRedis color="#DC382D" />;
    default: return null;
  }
}
