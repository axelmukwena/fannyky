import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { Email, Link, Phone } from "@mui/icons-material";
import { useRouter } from "next/router";
import Loading from "../../components/Loading/Loading";
import { updateActiveMenu } from "../../store/menuSlice/currentMenuSlice";
import SEO from "../../components/SEO";
import NotFound from "../404";
import { getResource } from "../../utilities/requests";
import { apiUrl } from "../../utilities/helpers";

const Contact = function Contact() {
  const dispatch = useDispatch();

  const [painter, setPainter] = useState(null);

  useEffect(() => {
    dispatch(updateActiveMenu("Contact"));

    const router = useRouter();
    const { painterSlug } = router.query;

    getResource(`/${painterSlug}`, setPainter);
  }, []);

  if (painter && painter.record === false) {
    return <NotFound message="Could not find artist." />;
  }

  if (!painter) {
    return <Loading />;
  }

  return (
    <>
      <SEO
        description={painter.about}
        title="Contact"
        siteTitle={painter.name}
      />
      <div style={{ margin: "20px 15px", width: "100%" }}>
        <Grid container spacing={2} style={{ width: "70%" }}>
          <Grid item xs={12}>
            <Typography
              style={{
                fontWeight: 600,
                fontSize: "1rem",
                fontFamily: "Roboto",
              }}
              className="page-title"
            >
              Contact
            </Typography>
          </Grid>

          <GetFirstHorizontal painter={painter} />

          <GetEmail painter={painter} />
          <GetPhone painter={painter} />
          <GetLink painter={painter} />
        </Grid>
      </div>
    </>
  );
};

const GetFirstHorizontal = function GetFirstHorizontal({ painter }) {
  if (painter.email || painter.phone || painter.link) {
    return (
      <Grid item xs={12}>
        <hr className="horizontal" />
      </Grid>
    );
  }
  return null;
};

const GetEmail = function GetEmail({ painter }) {
  if (painter.email) {
    return (
      <Grid xs={12} item style={{ display: "flex", alignItems: "center" }}>
        <Email style={{ fontSize: 19, marginRight: 7 }} />
        <Typography>{painter.email}</Typography>
      </Grid>
    );
  }
  return null;
};

const GetPhone = function GetPhone({ painter }) {
  if (painter.phone) {
    return (
      <Grid xs={12} item style={{ display: "flex", alignItems: "center" }}>
        |&nbsp;&nbsp;&nbsp;
        <Phone style={{ fontSize: 19, marginRight: 7 }} />
        <Typography>{painter.phone}</Typography>
      </Grid>
    );
  }
  return null;
};

const GetLink = function GetLink({ painter }) {
  if (painter.link) {
    return (
      <Grid xs={12} item style={{ display: "flex", alignItems: "center" }}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link style={{ fontSize: 19, marginRight: 7 }} />
        <a
          href={painter.link}
          target="_blank"
          className="text-color"
          rel="noreferrer"
        >
          <Typography>Professional Profile</Typography>
        </a>
      </Grid>
    );
  }
  return null;
};

/* export async function getServerSideProps({ params }) {
  const { painterSlug } = params;
  return {
    props: { painterSlug },
  };
} */

export async function getStaticPaths() {
  const response = await fetch(apiUrl("/"));
  const painters = await response.json();

  const paths = painters.map((painter) => ({
    params: { contact: `${painter.slug}/contact`, painterSlug: painter.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(content) {
  const { painterSlug } = content.params;
  // fetch list of posts
  const response = await fetch(apiUrl(`/${painterSlug}`));
  const painter = await response.json();
  return {
    props: {
      painter,
    },
  };
}

export default Contact;
