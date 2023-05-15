export default function Info() {
  return (
    <section className="info">
      <div className="info__background">
        <div className="info__backgroundLeft"></div>
        <div className="info__backgroundRight"></div>
      </div>
      <div className="container">
        <div className="info__wrapperOuter left">
          <div className="info_wrapperInner">
            <span className="info__subtitle">Documentation</span>
            <a
              href="https://directus.io/guides/get-started-building-a-react-website-with-directus/"
              className="info__title"
            >
              Read the Tutorial
            </a>
          </div>
        </div>
        <div className="info__wrapperOuter right">
          <div className="info_wrapperInner">
            <span className="info__subtitle">Codebase</span>
            <a
              href="https://github.com/directus/examples"
              target="_blank"
              rel="noreferrer"
              className="info__title"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
