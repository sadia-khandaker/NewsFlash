import React, {useEffect, useMemo, useState} from "react";
import {Typography} from "@mui/material";

/**
 * This is the title component of the landing page
 * @returns {JSX.Element}
 * @constructor
 */
export function LandingPageTitle() {
    const listOfColors = [
        "#ff575c",
        "#ea497a",
        "#e54e7d",
        "#f56e86",
        "#e54e7d",
        "#DC408F",
        "#ee55b2",
        "#FF6AD5",
        "#F18BE9",
        "#C774E8",
        "#CD8CF8",
        "#A286F3",
        "#AD8CFF",
        "#8F9BF2",
        "#8795E8",
        "#73A0F2",
        "#82a7d3",
        "#64AEF7",
        "#4FA4E5",
        "#4CB8D9",
        "#39C5CC",
        "#2AC5D9",
        "#3FD9C5",
        "#56C2A6",
    ];

    const getRandomColor = useMemo(() => {
        const getRandomIndex = () => Math.floor(Math.random() * listOfColors.length);
        return () => listOfColors[getRandomIndex()];
    }, [listOfColors]);

    const [randomColor, setRandomColor] = useState(getRandomColor());
    useEffect(() => {
        const interval = setInterval(() => {
            setRandomColor(getRandomColor());
        }, 600);
        return () => clearInterval(interval);
    }, [getRandomColor]);

    const title = "News Unleashed, Voices Unmasked";
    const subtitle = ["Join", "NewsFlash", "today."];

    return (
        <div>
            <Typography
                variant="h3"
                style={{
                    color: "black",
                    fontWeight: "700",
                    marginBottom: "10px",
                    marginTop: "30px",
                    padding: "30px",
                    fontSize: "3.0rem",
                    lineHeight: "1.2",
                    textShadow: "0.5px 0.5px 0.5px #000000",
                }}
            >
                {title}
            </Typography>

            <Typography
                variant="h5"
                style={{
                    color: "black",
                    fontWeight: "lighter",
                    marginBottom: "10px",
                    padding: "30px",
                    fontSize: "2rem",
                    lineHeight: "1.2",
                }}
            >
                {subtitle[0]}{" "}
                <span
                    style={{
                        color: randomColor,
                        fontWeight: "bold",
                    }}
                >
          {subtitle[1]}
        </span>{" "}
                {subtitle[2]}
            </Typography>
        </div>
    );
}