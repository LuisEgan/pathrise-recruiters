interface JumpButton {
  title: string;
  skipTo: number;
}
export const SKIP_BUTTONS: Array<JumpButton> = [
  { title: "🎉 Alignment", skipTo: 29 },
  { title: "📃 Resumes", skipTo: 66 },
  { title: "💼 Interviews", skipTo: 348 },
  { title: "✏️ Cover Letter", skipTo: 197 },
  { title: "🤝 Networking", skipTo: 262 },
  { title: "🙂 Rejection", skipTo: 410 },
];
