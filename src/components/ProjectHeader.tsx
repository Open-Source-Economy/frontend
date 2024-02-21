import { getFirstSentenceOrFirstNWordsFromValue } from "../services";
import React from "react";

export interface ProjectHeaderProps {
  name: string;
  tokenCode: string;
  tagline: string;
  quoteCurrency: string;
  logo: string;
}

export function ProjectHeader(props: ProjectHeaderProps) {
  return (
    <div className="d-flex gap-4 align-items-center">
      <img src={props.logo} className="brandimg" alt="TODO" />
      <div>
        <h5 className="helvetica text-white fw-700">
          {props.name} <span className="text-uppercase fs-6"> ({props.tokenCode})</span>
        </h5>
        <p className="text-white helvetica mb-0">{getFirstSentenceOrFirstNWordsFromValue(props.tagline, 10)}</p>
      </div>
    </div>
  );
}
