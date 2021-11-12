import React from "react";
import moment from "moment";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Article from "./Article";

const testArticle = {
  id: 1,
  headline: "Super-Cool Headline",
  createdOn: moment()
    .subtract(Math.random() * 10, "days")
    .format(),
  author: "The Tester",
  image: 134,
  summary: "Summary of the article",
  body: "No lorem-ipsum, here... wait a minute...",
};

test("renders component without errors", () => {
  render(<Article article={testArticle} />);
});

test("renders headline, author from the article when passed in through props", () => {
  render(<Article article={testArticle} />);

  screen.getByText("Super-Cool Headline");
  screen.getByText("By The Tester");
  screen.getByText("Summary of the article");
  screen.getByText("No lorem-ipsum, here... wait a minute...");
});

test('renders "Associated Press" when no author is given', () => {
  const noAuthorArticle = {
    ...testArticle,
    author: "",
  };

  render(<Article article={noAuthorArticle} />);

  screen.getByText("By Associated Press");
});

test("executes handleDelete when the delete button is pressed", () => {
  const handleDeleteMock = jest.fn();
  render(<Article article={testArticle} handleDelete={handleDeleteMock} />);

  const deleteButton = screen.getByTestId("deleteButton");
  userEvent.click(deleteButton);

  expect(handleDeleteMock).toBeCalled();
});