import { Card, Grid, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { getPublicData } from "../../../utils/Helpers";

const Publications = function Publications() {
  const [publications, setPublications] = useState([]);
  const { path } = useRouteMatch();

  useEffect(() => {
    getPublicData(setPublications, path);
  }, [path]);

  return (
    <div className="publications" style={{}}>
      <Grid container spacing={4}>
        {publications.map((publication) => (
          <Grid key={publication.id} item lg={4} md={6} xs={12}>
            <Card style={{ width: "100%", padding: 10 }}>
              <Typography
                style={{
                  fontWeight: 300,
                }}
              >
                {publication.painter.name}
              </Typography>
              <Link href={`${path}/${publication.slug}`}>
                <Typography
                  style={{
                    fontWeight: 300,
                  }}
                >
                  {publication.title}
                </Typography>
              </Link>
              <Typography
                style={{
                  fontWeight: 300,
                }}
              >
                {publication.decription}
              </Typography>
              <Typography
                style={{
                  fontWeight: 300,
                }}
              >
                {publication.link}
              </Typography>
              <Typography
                style={{
                  fontWeight: 300,
                }}
              >
                {publication.published_year}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Publications;
