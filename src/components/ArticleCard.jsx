import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getAssetURL } from "../utils/get-asset-url";

export default function Article({ article, bordered }) {
  return (
    <article className={`article ${bordered}`}>
      <div className="article__topWrapper">
        <div className="article__imageWrapper">
          <Link to={`/blog/${article.id}`}><img
            src={article.cover_image ? getAssetURL(article.cover_image) : `${getAssetPrefix()}assets/09372518-3a60-4718-bf6a-fc52f25a3de5`}
            alt=""
            loading="lazy"
          />
          </Link>

        </div>
        <span aria-hidden="true" className="tag">
          views:{article.views}
        </span>
      </div>
      <div className="article__bottomWrapper">
        <h1 className="article__title">
          <Link to={`/blog/${article.id}`}>{article.title}</Link>
        </h1>
        <div className="article__detail">
          {/* <div className="article__detailAuthor">
            <img
              src={getAssetURL(article.author.avatar)}
              alt=""
              loading="lazy"
            />
          </div> */}
          <div className="article__detailInner">
            {/* <div className="article__detailInnerAuthor">
              {`${article.author.first_name} ${article.author.last_name}`}
            </div> */}
            <div className="article__detailInnerTime">
              {article.publish_date}
            </div>
            {/* <div className="article__detailInnerCategory">Writing</div> */}
          </div>
        </div>
      </div>
    </article>
  );
}

Article.propTypes = {
  article: PropTypes.object.isRequired,
  bordered: PropTypes.bool.isRequired,
};
