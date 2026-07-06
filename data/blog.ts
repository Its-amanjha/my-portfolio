export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string; // Markdown or raw text with paragraphs
  color: string; // Neobrutalist accent color
}

export const blogPosts: BlogPost[] = [
  {
    slug: "shift-to-ai-native-architectures",
    title: "The Shift to AI-Native Software Architectures",
    excerpt: "How software design changes when autonomous AI agents are treated as core runtime components, not just optional API integration points.",
    date: "Jul 05, 2026",
    readTime: "5 min read",
    tags: ["AI Engineering", "Software Design", "System Architecture"],
    color: "#FFE135",
    content: `
The integration of Artificial Intelligence into software engineering is moving far beyond simple chat widgets and autocomplete suggestions. We are entering the era of AI-native software architecture. In this paradigm, large language models (LLMs) and autonomous agents are not just external APIs; they are fundamental, stateful runtime components that make operational decisions.

### 1. From Linear Code to Probabilistic Loops
Traditional software is deterministic—you feed it input A, and it predictably produces output B through a sequence of hardcoded conditional paths. AI-native applications, however, rely on probabilistic execution loops. The system plans, executes a tool, evaluates the output, and self-corrects if the result does not meet the specified objective. 

Designing system architectures that can handle this non-deterministic behavior is one of the most challenging and exciting aspects of modern systems engineering.

### 2. The Agent as a Microservice
Instead of wrapping an LLM in a single monolithic controller, we are shifting toward multi-agent microservice architectures. Under this model, separate agent nodes are given narrow scopes, private contexts, and specialized toolsets:
- **Researcher Agent**: Crawls data sources and aggregates context.
- **Coder Agent**: Writes target modules based on aggregated specifications.
- **Debugger Agent**: Runs test suites, parses stack traces, and patches code.

These agents communicate asynchronously over structured message buses, mirroring the microservices architectures of standard enterprise applications.

### 3. Structural Ownership & Guardrails
A common pitfall of early agentic systems is a complete loss of control over execution paths. AI-native design dictates strict boundary constraints. Code written by agents should be executed in sandboxed containers, validated against deterministic unit tests, and reviewable by human engineers before deployment. 

The goal of agentic software engineering is not to replace human decision-making, but to automate the execution of high-effort tasks while keeping humans at the center of architectural control.
    `
  },
  {
    slug: "building-self-correcting-coding-agents",
    title: "Building Self-Correcting Coding Loop Agents",
    excerpt: "A deep dive into the engineering loop that enables an AI agent to write code, parse compiler errors, execute tests, and repair its own mistakes.",
    date: "Jun 24, 2026",
    readTime: "7 min read",
    tags: ["Agentic AI", "TDD", "Automation"],
    color: "#FF6B9D",
    content: `
Building an AI agent that writes code is relatively simple. Building one that reliably edits existing systems, runs test suites, interprets stack traces, and self-corrects without human intervention is an entirely different level of engineering.

In this post, we breakdown the structure of a self-correcting coding loop.

### The Self-Correction Loop Anatomy
A robust agentic coding lifecycle runs through four distinct stages:

1. **Analysis & Spec Planning**: The agent reads the target files, identifies references and dependencies, and designs a localized implementation plan.
2. **Scaffolding and TDD**: The agent writes a test case that captures the target behavior (Test-Driven Development is critical for agentic correctness; without a test, the agent has no feedback loop).
3. **Execution**: The agent writes the implementation code to satisfy the test.
4. **Correction (The Loop)**:
   - The test suite is run.
   - If the test fails, the agent intercepts the stdout/stderr stack trace.
   - The agent analyzes the trace, locates the bug, modifies the code, and re-runs the test.
   - The loop repeats until the test passes or a maximum iteration threshold is hit.

### Why Test-Driven Development (TDD) is Critical
For human developers, TDD is a best practice. For AI agents, it is a prerequisite. An agent writing code without tests is essentially flying blind; it cannot verify logic, catch side effects, or check boundary conditions. Tests provide the agent with a clean, programmatic feedback channel. If the test passes, the agent knows its job is done. If it fails, the test output acts as the exact error prompt for the next repair cycle.

### Conclusion
By treating compiler logs and test runner outputs as first-class prompts, we can transform static code generation into dynamic, self-correcting engineering loops. The future of software engineering lies in building these robust orchestration pipelines.
    `
  },
  {
    slug: "designing-neobrutalist-ui",
    title: "Designing Neobrutalist UI/UX for Tech Portfolios",
    excerpt: "Why the raw print-inspired aesthetic of neobrutalism makes developer portfolios stand out, and how to build it using vanilla CSS and Tailwind.",
    date: "Jun 12, 2026",
    readTime: "4 min read",
    tags: ["UI/UX", "Design", "CSS"],
    color: "#4ECDC4",
    content: `
Most modern tech portfolios look exactly the same: sleek dark modes, subtle grey grids, glowing purple gradients, and generic animated cards. While clean, this aesthetic has become the template default of the modern web. 

To stand out, developers are turning to a bold, tactile style: **Neobrutalism**.

### What is Neobrutalism?
Neobrutalism (or neo-brutalism) fuses the raw, blocky structural layout of architectural brutalism with vibrant, high-contrast digital elements:
- **Tactile Shadows**: Hard, offset drop shadows (using solid colors, no blur) that make cards look like physical buttons.
- **Bold Borders**: High-contrast, dark outlines (\`3px\` or \`4px\` black lines) separating elements.
- **Vibrant, Flat Colors**: Bold primary colors (cyan, magenta, yellow, lime green) used as flat fills, avoiding gradients.
- **Typographic Asymmetry**: Using monospace font telemetry mixed with large, bold print-style display headers.

### Implementing Neobrutalist Cards in CSS
To make a standard card look neobrutalist, you drop all border-radius gradients and box-shadow blurs. Here is the CSS pattern:

\`\`\`css
.neo-card {
  background: #ffffff;
  border: 3px solid #1a1a1a;
  box-shadow: 5px 5px 0px #1a1a1a;
  border-radius: 4px;
  padding: 1.5rem;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.neo-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0px #1a1a1a;
}
\`\`\`

### The Visual Psychology
Neobrutalism works because it demands attention. By using flat colors and bold lines, it rejects the smooth, frictionless abstractions of modern interfaces in favor of a raw, authentic, and mechanical look. For developer portfolios, it tells visitors that you care about structure, system design, and building things that feel alive.
    `
  }
];
