import React, { useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { Email, Link, Phone } from "@mui/icons-material";
import { useRouter } from "next/router";
import Loading from "../../components/Loading/Loading";
import { updateActiveMenu } from "../../store/menuSlice/currentMenuSlice";
import SEO from "../../components/SEO";
import NotFound from "../404";
import { apiUrl } from "../../utilities/helpers";
import Layout from "../../components/Layout";

const Contact = function Contact({ painter }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(updateActiveMenu("Contact"));
  }, []);

  if (router.isFallback) {
    return <Loading />;
  }

  if (!painter) return null;

  if (painter && painter.record === false) {
    return <NotFound message="Could not find artist." />;
  }

  return (
    <>
      <SEO
        description={painter.about}
        title="Contact"
        siteTitle={painter.name}
      />
      <Layout painter={painter}>
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
      </Layout>
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
    params: { painterSlug: painter.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(content) {
  const { painterSlug } = content.params;
  const response = await fetch(apiUrl(`/${painterSlug}`));
  const painter = await response.json();

  if (!painter) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      painter,
    },
    revalidate: 5,
  };
}

export default Contact;
