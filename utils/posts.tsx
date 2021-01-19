export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
}

export default [
  {
    id: "16147678504850",
    title: "First Testing Post",
    summary: "Test post 1 summary",
    content: `![Header Image](https://gcs.dustin.sh/u/cce17dd3c78b35a8.png)\n# Testing post\n### Testing\n\ntasdjadskjahsdkhak dhakshdasjkdhaskjhdakshdaksjdkashdkahdkjahsdkjahskjdhakjsd hakjshdkashdakjshdkjashdkjashdkashdkajhsdkjahsdkajhsdkajhsdaksjdh`,
    date: new Date("01/18/2021 22:02:30").toISOString(),
  },
  {
    id: "12345678909876",
    title: "Second Testing Post",
    summary: "Test post 2 summary",
    content: `# TESTING 123\n## TESTING\n\n### TEST BRO\n### TEST BRO\n### TEST BRO\n### TEST BRO\n### TEST BRO\n### TEST BRO\n### TEST BRO\n### TEST BRO\n### TEST BRO\n### TEST BRO\n### TEST BRO\n### TEST BRO\n### TEST BRO\n### TEST BRO\n### TEST BRO\n# BOTTOM`,
    date: new Date("01/15/2021 22:10:00").toISOString(),
  },
] as BlogPost[];
