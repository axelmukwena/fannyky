import { Button, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import { convertToHTML } from "draft-convert";
import { convertFromRaw } from "draft-js";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { deleteResource } from "../../../utilities/requests";
import Toast from "../../../utilities/toast";
import NextLink from "../../NextLink";
import CustomHorizontal from "../CustomHorizontal";
import NewDialog from "./NewDialog";

const Exhibitions = function Exhibitions({ solo, group, others }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <IsLoggedIn />
      <Placeholder solo={solo} group={group} others={others} />
      <TypeExhibitions title="Solo Exhibitions" exhibitions={solo} />
      <TypeExhibitions title="Group Exhibitions" exhibitions={group} />
      <TypeExhibitions title="Other Exhibitions" exhibitions={others} />
    </div>
  );
};

const Placeholder = function Placeholder({ solo, group, others }) {
  if (solo.length === 0 && group.length === 0 && others.length === 0) {
    return (
      <>
        <Typography
          style={{
            fontWeight: 600,
            fontSize: "1rem",
            fontFamily: "Roboto",
            marginBottom: 20,
          }}
          className="page-title"
        >
          Exhibitions
        </Typography>
        <CustomHorizontal />
      </>
    );
  }
  return null;
};

const TypeExhibitions = function TypeExhibitions({ title, exhibitions }) {
  if (exhibitions.length > 0) {
    return (
      <div>
        <Typography
          style={{
            fontWeight: 600,
            fontSize: "1rem",
            fontFamily: "Roboto",
            marginBottom: 20,
          }}
          className="page-title"
        >
          {title}
        </Typography>
        <CustomHorizontal />

        <div className="row" style={{ marginTop: 15, marginBottom: 50 }}>
          <GetExhibitions exhibitions={exhibitions} />
        </div>
      </div>
    );
  }
  return null;
};

const GetExhibitions = function GetExhibitions({ exhibitions }) {
  if (exhibitions.length > 0) {
    return exhibitions.map((exhibition) => (
      <div
        key={exhibition.slug}
        className="exhibition"
        style={{
          borderRadius: 4,
          padding: 0,
          width: "100%",
          margin: "10px 0",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%" }}>
          <Typography
            className="justify"
            style={{ paddingLeft: 50, textIndent: -47 }}
          >
            <NextLink
              href="/[painterSlug]/exhibitions/[exhibitionSlug]"
              as={`/${exhibition.painter.slug}/exhibitions/${exhibition.slug}`}
              className="exhibition-title-index-all"
            >
              {exhibition.start_date}
              <EndDate exhibition={exhibition} />
              <span>
                <span
                  className="exhibition-title-index"
                  style={{ fontStyle: "italic", marginLeft: "14px" }}
                >
                  {exhibition.title}{" "}
                </span>
                {exhibition.organization} {exhibition.location}{" "}
                <TrimDescription exhibition={exhibition} />
              </span>
            </NextLink>
          </Typography>

          <DeleteExhibition exhibition={exhibition} />
        </div>
      </div>
    ));
  }
  return "";
};

const EndDate = function EndDate({ exhibition }) {
  if (exhibition.start_date && exhibition.end_date) {
    return ` - ${exhibition.end_date}`;
  }
  return exhibition.end_date;
};

const TrimDescription = function TrimDescription({ exhibition }) {
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
  let { description } = exhibition;
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

const DeleteExhibition = function DeleteExhibition({ exhibition }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handleDeleteExhibition = () => {
    const path = `/${painter.id}/exhibitions/${exhibition.id}`;

    deleteResource(`${path}`, handleImagesResponse);
  };

  if (currentUser && painter) {
    return (
      <Button
        variant="contained"
        onClick={() => handleDeleteExhibition()}
        style={{ backgroundColor: "#b12222", marginTop: 10 }}
      >
        <Typography>Delete</Typography>
      </Button>
    );
  }
  return null;
};

const IsLoggedIn = function IsLoggedIn() {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);
  const [openNew, setOpenNew] = useState(false);

  const handleOpenNew = () => {
    setOpenNew(true);
  };

  const handleCloseNew = () => {
    setOpenNew(false);
  };

  if (currentUser && painter) {
    return (
      <div className="row" style={{ marginTop: 25, marginBottom: 15 }}>
        <Button
          style={{ width: 200, height: 40, marginRight: 25 }}
          variant="contained"
          color="primary"
          onClick={() => handleOpenNew()}
        >
          New Exhibition
        </Button>
        <NewDialog
          exhibition={false}
          painter={painter}
          open={openNew}
          handleClose={handleCloseNew}
        />
      </div>
    );
  }
  return "";
};

export default Exhibitions;
