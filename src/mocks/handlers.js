import { rest } from "msw";

let questions = [
  {
    id: 1,
    prompt: "lorem testum 1",
    answers: ["1", "2", "3"],
    correctIndex: 0,
  },
  {
    id: 2,
    prompt: "lorem testum 2",
    answers: ["1", "2", "3"],
    correctIndex: 1,
  },
];

export const handlers = [
  rest.get("http://localhost:4000/questions", (req, res, ctx) => {
    return res(ctx.json(questions));
  }),
  rest.post("http://localhost:4000/questions", (req, res, ctx) => {
    const id = questions[questions.length - 1]?.id + 1 || 1;
    const question = { id, ...req.body };
    questions.push(question);
    return res(ctx.json(question));
  }),
];
