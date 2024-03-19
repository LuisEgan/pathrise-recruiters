interface JumpButton {
  title: string;
  skipTo: number;
}
export const SKIP_BUTTONS: Array<JumpButton> = [
  { title: "🎉 Alignment", skipTo: 10 },
  { title: "📃 Resumes", skipTo: 120 },
  { title: "💼 Interviews", skipTo: 10 },
  { title: "✏️ Cover Letter", skipTo: 10 },
  { title: "🤝 Networking", skipTo: 10 },
  { title: "🙂 Rejection", skipTo: 10 },
];
