import React from "react";
import { ExerciseWrapper } from "../Styled"
import { SessionWrapper } from "../Styled"

export default () => {
  return (      
      <ExerciseWrapper columns={6}>
        <div className="exerciseid">
          <p>ID</p>
        </div>

        <div className="exerciseName">
          <p>Navn</p>
        </div>

        <div className="exerciseWeight">
          <select>
            <option value="10">10 KG</option>
            <option value="11">11 KG</option>
            <option value="12">12 KG</option>
            <option value="13">13 KG</option>
          </select>
        </div>

        {/**
                            Tips blir en popup over sessionvindu
                        */}

        <div className="exerciseGuide">
          <p>Guide</p>
          <div className="exerciseGuideVideo">
            {/**
                                Video kommer her
                            */}
          </div>
          <div className="exerciseGuideInfo">
            {/**
                                Info kommer her
                            */}
          </div>
        </div>

        <div className="exerciseRemove">
         <button className="exerciseRemoveButton"> Remove</button>

        </div>
      </ExerciseWrapper>    
  );
};
