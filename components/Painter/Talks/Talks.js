import { Button, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import { convertToHTML } from "draft-convert";
import { convertFromRaw } from "draft-js";
import React, { useState } from "react";
import { deleteResource } from "../../../utilities/requests";
import Toast from "../../../utilities/toast";
import CustomHorizontal from "../CustomHorizontal";
import NewDialog from "./NewDialog";
import NextLink from "../../NextLink";
import useUser from "../../../api/useUser";

const Talks = function Talks({ talks, painter }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <Typography
        style={{
          fontWeight: 600,
          fontSize: "1rem",
          fontFamily: "Roboto",
          marginBottom: 20,
        }}
        className="page-title"
      >
        Talks
      </Typography>
      <CustomHorizontal />
      <IsLoggedIn painter={painter} />
      <div className="row" style={{ marginTop: 15 }}>
        <GetTalks talks={talks} />
      </div>
    </div>
  );
};

const GetTalks = function GetTalks({ talks }) {
  if (talks) {
    return talks.map((talk) => (
      <div
        key={talk.slug}
        className="talk"
        style={{
          borderRadius: 4,
          padding: 0,
          width: "100%",
          margin: "10px 0",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%" }}>
          <Typography style={{ paddingLeft: 50, textIndent: -47 }}>
            <NextLink
              href="/[painterSlug]/talks/[talkSlug]"
              as={`/${talk.painter.slug}/talks/${talk.slug}`}
              className="talk-title-index-all"
            >
              {talk.date}
              <span>
                <span
                  className="talk-title-index"
                  style={{ fontStyle: "italic", marginLeft: "14px" }}
                >
                  {talk.title}{" "}
                </span>
                {talk.organizer} {talk.location} <TrimDescription talk={talk} />
              </span>
            </NextLink>
          </Typography>

          <DeleteTalk talk={talk} />
        </div>
      </div>
    ));
  }
  return "";
};

const TrimDescription = function TrimDescription({ talk }) {
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const convertContentToHTML = (content) => {
    if (content) {
      const object = JSON.parse(content);
      const raw = convertFromRaw(object);
      const html = convertToHTML(raw);
      const markUp = createMarkup(html);
      return markUp;
    }
    return null;
  };

  // {des.substring(0, 300)}...
  let { description } = talk;
  if (description) {
    description = convertContentToHTML(description);
    const html = "__html";
    const items = description[html].split("</p>");
    if (items.length > 2) {
      let more = `${items[0]} ${items[1]}`;
      more = more.split("<p>");
      let text = "";
      for (let i = 0; i < more.length; i += 1) {
        text += more[i];
      }

      description[html] = text;
    } else {
      let text = "";
      for (let i = 0; i < items.length; i += 1) {
        text += items[i];
      }
      const more = text.split("<p>");
      text = "";
      for (let i = 0; i < more.length; i += 1) {
        text += more[i];
      }
      description[html] = text;
    }

    if (description[html].length > 300) {
      description[html] = `${description[html].substring(0, 300)}...`;
      return <span dangerouslySetInnerHTML={description} />;
    }
    return <span dangerouslySetInnerHTML={description} />;
  }
  return null;
};

const DeleteTalk = function DeleteTalk({ talk }) {
  const { user } = useUser();
  const { painter } = talk;

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handleDeleteTalk = () => {
    const path = `/${painter.id}/talks/${talk.id}`;

    deleteResource(`${path}`, handleImagesResponse);
  };

  if (user && painter) {
    return (
      <Button
        variant="contained"
        onClick={() => handleDeleteTalk()}
        style={{ backgroundColor: "#b12222", marginTop: 10 }}
      >
        <Typography>Delete</Typography>
      </Button>
    );
  }
  return null;
};

const IsLoggedIn = function IsLoggedIn({ painter }) {
  const { user } = useUser();

  const [openNew, setOpenNew] = useState(false);

  const handleOpenNew = () => {
    setOpenNew(true);
  };

  const handleCloseNew = () => {
    setOpenNew(false);
  };

  if (user && painter) {
    return (
      <div className="row" style={{ marginTop: 25 }}>
        <Button
          style={{ width: 200, height: 40, marginRight: 25 }}
          variant="contained"
          color="primary"
          onClick={() => handleOpenNew()}
        >
          New Talk
        </Button>
        <NewDialog
          talk={false}
          painter={painter}
          open={openNew}
          handleClose={handleCloseNew}
        />
      </div>
    );
  }
  return "";
};

export default Talks;
