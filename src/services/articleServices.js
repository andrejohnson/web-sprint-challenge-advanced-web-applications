import axiosWithAuth from "./../utils/axiosWithAuth";

const articleService = async () => {
  try {
    const response = await axiosWithAuth().get(
      "http://localhost:5000/api/articles"
    );
    return response;
  } catch (error) {
    console.error("COULD NOT FETCH ARTICLES!", error);
  }
};

export default articleService;
