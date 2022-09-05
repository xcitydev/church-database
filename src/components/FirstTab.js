import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function FirstTab() {
  const options = ["one", "two", "three"];
  const defaultOption = options[0];
  const selectedSubjectName = () => {
    var subjectIdNode = document.getElementById("subjectName");
    var value = subjectIdNode.options[subjectIdNode.selectedIndex].text;
    console.log("The selected value=" + value);
    switch (value) {
      case "MySQL":
        document.getElementById("javascript").style.display = "none";
        document.getElementById("java").style.display = "none";
        document.getElementById("sql").style.display = "grid";

        console.log("yeah");
        break;
      case "MongoDB":
        document.getElementById("sql").style.display = "none";
        document.getElementById("javascript").style.display = "none";
        document.getElementById("java").style.display = "grid";
        console.log("nah");
        break;
      default:
        return "neutral";
    }
  };
  return (
    <div>
      <select onChange={() => selectedSubjectName()} id="subjectName">
        <option>Javascript</option>
        <option>MySQL</option>
        <option>MongoDB</option>
        <option>Java</option>
      </select>
      <div id="javascript">
        <p>Javascript</p>
      </div>
      <div id="sql">
        <p>MySQL</p>
      </div>
      <div id="java">
        <p>Java</p>
      </div>
    </div>
  );
}

export default FirstTab;
