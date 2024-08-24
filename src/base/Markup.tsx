import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const aClass = "text-lopurple hover:text-loorange hover:underline cursor-pointer";
const components = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a: (props: any) => {
    if (props.href && props.href.includes("http")) {
      return <a {...props} className={aClass} />;
    }

    if (!props.href) {
      return props.children;
    }

    return (
      <Link to={props.href} title={props.title} className={aClass}>
        {props.children}
      </Link>
    );
  },
};

export const MarkupFromPath = ({ path }: { path: string }) => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    // Fetch Markdown file content from your server or any other source

    const callback = async (path: string) => {
      setMarkdown("");

      try {
        const response = await fetch(path);

        if (response.status === 404) {
          if (path.includes("/markup")) {
            callback(path.split("/").slice(0, -1).join("/") + ".md");
          }
          return;
        }

        const text = await response.text();

        setMarkdown(text);
      } catch (error) {
        console.error("Error fetching Markdown:", error);
      }
    };

    callback(path);
  }, [path]);

  return <Markup markdown={markdown} />;
};

export const Markup = ({ markdown }: { markdown: string }) => {
  return <ReactMarkdown components={components}>{markdown}</ReactMarkdown>;
};
