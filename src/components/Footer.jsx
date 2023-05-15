import IconGithub from "./icons/Github";
import IconLinkedin from "./icons/Linkedin";
import IconTwitter from "./icons/Twitter";
import IconYoutube from "./icons/Youtube";

export default function Footer() {
  return (
    <footer>
      {/* <div className="container footer__topWrapper">
        <span>
          Generated with <span className="underline">React</span>, powered by{" "}
          <span className="underline">Directus</span>.
        </span>
      </div> */}
      <div className="container footer__bottomWrapper">

        <a className="notice" href="https://beian.miit.gov.cn">京ICP备2023003394号-1</a>

        <ul className="footer__socials">
          <li>
            <a
              href="https://github.com/directus"
              className="logo"
              target="_blank"
              rel="noreferrer noopener"
            >
              <IconGithub />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/c/DirectusVideos"
              className="logo"
              target="_blank"
              rel="noreferrer noopener"
            >
              <IconYoutube />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/directus-io"
              className="logo"
              target="_blank"
              rel="noreferrer noopener"
            >
              <IconLinkedin />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/directus"
              className="logo"
              target="_blank"
              rel="noreferrer noopener"
            >
              <IconTwitter />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
