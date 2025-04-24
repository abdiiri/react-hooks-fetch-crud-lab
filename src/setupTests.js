// filepath: /home/user/react-hooks-fetch-crud-lab/src/setupTests.js
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
