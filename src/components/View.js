import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Article from "./Article";
import EditForm from "./EditForm";
import axiosWithAuth from "../utils/axiosWithAuth";
import articleService from "../services/articleServices";

const View = (props) => {

  const [articles, setArticles] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState();


  useEffect(() => {
    const getArticles = async () => {
      const articleResponse = await articleService();
      setArticles(articleResponse.data);
    };
    getArticles();
  }, []);


  const handleDelete = (id) => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/articles/${id}`)
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("FAILED TO DELETE ARTICLE!", error);
      });
  };
  const handleEdit = (article) => {
    axiosWithAuth()
      .put(`http://localhost:5000/api/articles/${editId}`, article)
      .then((response) => {
        setEditing(false);
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("FAILED TO EDIT ARTICLE!", error);
      });
  };
  const handleEditSelect = (id) => {
    setEditing(true);
    setEditId(id);
  };
  const handleEditCancel = () => {
    setEditing(false);
  };

  return (
    <ComponentContainer>
      <HeaderContainer>View Articles</HeaderContainer>
      <ContentContainer flexDirection="row">
        <ArticleContainer>
          {articles.map((article) => {
            return (
              <ArticleDivider key={article.id}>
                <Article
                  key={article.id}
                  article={article}
                  handleDelete={handleDelete}
                  handleEditSelect={handleEditSelect}
                />
              </ArticleDivider>
            );
          })}
        </ArticleContainer>

        {editing && (
          <EditForm
            editId={editId}
            handleEdit={handleEdit}
            handleEditCancel={handleEditCancel}
          />
        )}
      </ContentContainer>
    </ComponentContainer>
  );
};

export default View;


const Container = styled.div`
  padding: 0.5em;
`;
const HeaderContainer = styled.h1`
  border-bottom: solid black 2px;
  padding: 1em;
  margin: 0;
  font-size: 1.5em;
  background: black;
  color: white;
`;

const ArticleDivider = styled.div`
  border-bottom: 1px solid black;
  padding: 1em;
`;

const ComponentContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
`;

const ArticleContainer = styled.div`
  background: grey;`