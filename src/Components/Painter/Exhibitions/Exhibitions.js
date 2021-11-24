import { Card, Grid, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { getResource } from "../../../utils/requests";

const Exhibitions = function Exhibitions() {
  const [exhibitions, setExhibitions] = useState([]);
  const { path } = useRouteMatch();

  useEffect(() => {
    getResource(path, setExhibitions);
  }, [path]);

  return (
    <div className="exhibitions">
      <Grid container spacing={4}>
        {exhibitions.map((exhibition) => (
          <Grid key={exhibition.id} item lg={4} md={6} xs={12}>
            <Card style={{ width: "100%", padding: 10 }}>
              <Typography
                style={{
                  fontWeight: 300,
                }}
              >
                {exhibition.painter.name}
              </Typography>
              <Link href={`${path}/${exhibition.slug}`}>
                <Typography
                  style={{
                    fontWeight: 300,
                  }}
                >
                  {exhibition.title}
                </Typography>
              </Link>
              <Typography
                style={{
                  fontWeight: 300,
                }}
              >
                {exhibition.start_date} {exhibition.end_date}
              </Typography>
              <Typography
                style={{
                  fontWeight: 300,
                }}
              >
                {exhibition.link}
              </Typography>
              <Typography
                style={{
                  fontWeight: 300,
                }}
              >
                {exhibition.location}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Exhibitions;
