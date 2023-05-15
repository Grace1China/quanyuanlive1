import { useState, useEffect, useLayoutEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import IconBack from "../components/icons/Back";
import { directus } from "../services/directus";
import { formatRelativeTime } from "../utils/format-relative-time";
import { getAssetURL } from "../utils/get-asset-url";
import { getCourseWithViewCount, itemsPost } from "../api/api"
import { useAppContext } from "../layouts/Default"
export default function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentContent, setCommentContent] = useState('');

  const [moreArticles, setMoreArticles] = useState(null);

  const location = useLocation();
  const { app, dispatch } = useAppContext();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  function handleCommentContent(e) {
    setCommentContent(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let commentsResp;
    setStatus('submitting');
    console.log(e)
    try {
      // await directus.items('comment').createOne({ course: id, content: commentContent });
      await itemsPost('comment', { course: id, content: commentContent })
      commentsResp = await directus.items('comment').readByQuery({
        fields: ["*"],//"author.avatar", "author.first_name", "author.last_name"
        sort: "-id",
        filter: {
          course: {
            _eq: id
          }
        }
      });
      console.log("commentsResp", commentsResp)
      setComments(commentsResp.data)
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    async function fetchData() {
      let articleResponse;
      let commentsResp;

      try {

        articleResponse = await getCourseWithViewCount(id)
        const formattedArticle = {
          ...articleResponse,
          publish_date: formatRelativeTime(
            new Date(articleResponse.publish_date)
          ),
        };
        setArticle(formattedArticle);

        commentsResp = await directus.items('comment').readByQuery({
          fields: ["*"],//"author.avatar", "author.first_name", "author.last_name"
          sort: "-id",
          filter: {
            course: {
              _eq: id
            }
          }
        });
        console.log("commentsResp", commentsResp)
        setComments(commentsResp.data)
      } catch (err) {
        navigate("/404", { replace: true });
      }
    }
    fetchData();
  }, [id, navigate]);

  return (
    <div className="current-article">
      {article && (
        <section>
          <div className="container">
            <Link to="/" className="current-article__backlink">
              <IconBack className="icon" />
              <span>Back to Articles</span>
            </Link>
            <h1 className="current-article__title">{article.title}</h1>
            <div className="current-article__detail">
              <div className="current-article__wrapperOuter">
                <div className="current-article__wrapperInner">
                  <div className="current-article__time">
                    {article.publish_date}
                  </div>
                  <div className="current-article__views">
                    views:{article.views}
                  </div>
                  {/* </div> */}
                </div>
              </div>
              {
                article.cover_image ? <div className="current-article_coverImage">
                  <img src={getAssetURL(article.cover_image)} alt="" />
                </div> : <></>
              }

            </div>
            <div className="current-article__body">
              <div
                className="current-article__bodyContent"
                dangerouslySetInnerHTML={{ __html: article.content }}
              ></div>
            </div>
          </div>
        </section>

      )}
      {
        article && (
          <section className="submit-comment">
            <div className="container">
              <form onSubmit={handleSubmit}>
                <textarea rows="4" value={commentContent} onChange={handleCommentContent} className="comment-content"></textarea>
                {
                  app.loginName ? (<> <span> 用户{app.loginName.split('@')[0]} </span>< button > 提交</button></>) : <a href="/login">登录后评论</a>
                }
              </form>

            </div >
          </section >
        )
      }
      {
        article && (
          <section className="comments">
            <div className="container">
              {comments && comments.map((cm, index) => (
                <div>
                  {cm.content}
                  <br></br>
                </div>
              ))}
            </div>
          </section>
        )
      }
      {/* {moreArticles && <MoreArticles articles={moreArticles} />} */}
    </div >
  );
}
