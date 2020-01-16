import * as React from "react";
import { useState, useEffect } from "react";
import { oc as option } from "ts-optchain";
import Typography from "@material-ui/core/Typography";

const digitalAssets = [
  "photoshop image",
  "design mockup",
  "design texture",
  "fitness e-book",
  "CSS style theme",
  "SVG animation"
]

const RandomTitle = (props) => {

  let [title, setTitle] = useState(
    ("..." + digitalAssets[0] + ".".repeat(20)).slice(0,20)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      let index = Math.floor(Math.random() * Math.floor(digitalAssets.length))
      setTitle((digitalAssets[index] + ".".repeat(20)).slice(0,20))
    }, 1500)
    // clear on unmount
    return () => clearInterval(interval);
  }, [])

  return (
    <Typography variant={"subtitle2"} className={option(props).classes.subTitle()}>
      <span className={option(props).classes.subline1()}> Find a {title} </span>
      <br/>
      <span className={option(props).classes.subline2()}> that gives you an unfair advantage </span>
      <br/>
      <span className={option(props).classes.subline3()}> or upload your files and earn. </span>
    </Typography>
  )
}

export default RandomTitle;