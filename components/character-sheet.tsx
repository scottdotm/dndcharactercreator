"use client";
import { useLoadingState } from "./ui/use-loading-state";
import React, { useState, useEffect } from "react";
import { submitCharacterSheet } from "@/app/actions";
import { ApiOutput } from "@/app/interface/api"; // Import the ApiOutput interface
import { getAlignments, getRaces, getClasses } from "@/app/api/5eSRD"; // Import the API getter functions
import { Label } from "./ui/label";
import { SubmitButton } from "@/components/submit-button";
import { Dropdown } from "@/components/dropdown";

export default function CharacterSheet() {
  const { isLoading, startLoading, stopLoading } = useLoadingState();
  const [errorMessage, setErrorMessage] = useState("");
  const [alignments, setAlignments] = useState<ApiOutput[]>([]);
  const [races, setRaces] = useState<ApiOutput[]>([]);
  const [classes, setClasses] = useState<ApiOutput[]>([]);
  const [selectedAlignment, setSelectedAlignment] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [characterName, setCharacterName] = useState("");

  useEffect(() => {
    const fetchAlignments = async () => {
      startLoading();
      try {
        {
          /* Try and grab alignments from the API */
        }
        const alignments = await getAlignments();
        setAlignments(alignments);
        console.log("Alignments set in state:", alignments);
      } catch (error) {
        console.error("Error fetching alignments:", error);
        setErrorMessage("Failed to load alignments. Please try again later.");
      } finally {
        stopLoading();
      }
    };
    const fetchRaces = async () => {
      try {
        const races = await getRaces();
        setRaces(races);
        console.log("Races set in state:", races);
      } catch (error) {
        console.error("Error fetching alignments:", error);
        setErrorMessage("Failed to load alignments. Please try again later.");
      } finally {
        stopLoading();
      }
    };
    const fetchClasses = async () => {
      try {
        const classes = await getClasses();
        setClasses(classes);
        console.log("Classes set in state:", classes);
      } catch (error) {
        console.error("Error fetching alignments:", error);
        setErrorMessage("Failed to load alignments. Please try again later.");
      } finally {
        stopLoading();
      }
    };

    fetchAlignments();
    fetchRaces();
    fetchClasses();
  }, []);

  const handleSubmit = () => {
    // Validate form inputs here
    if (!characterName || !selectedAlignment) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // Submit character data using submitCharacterSheet function
    const formData = new FormData();
    formData.append("characterName", characterName);
    formData.append("alignment", selectedAlignment);

    // Submit character data using submitCharacterSheet function
    submitCharacterSheet(formData);
  };

  return (
    <div>
      <div className="flex gap-8 justify-center items-center">
        <h1>DnD Character Sheet</h1>
      </div>
      <div className="flex-row gap-8 justify-center items-center">
        <div className="flex-auto gap-8 justify-center items-center">
          <Label>
            Please select alignment:
            <Dropdown
              data={alignments}
              selectedData={selectedAlignment}
              setSelectedData={setSelectedAlignment}
              isLoading={isLoading}
            />
          </Label>
        </div>
        <div className="flex-auto gap-8 justify-center items-center">
          <Label>
            Please select race:
            <Dropdown
              data={races}
              selectedData={selectedRace}
              setSelectedData={setSelectedRace}
              isLoading={isLoading}
            />
          </Label>
          <Label>
            Please select class:
            <Dropdown
              data={classes}
              selectedData={selectedClass}
              setSelectedData={setSelectedClass}
              isLoading={isLoading}
            />
          </Label>
          <Label>
            Character Name:
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="Enter character name"
            />
          </Label>
        </div>
        <div className="flex gap-8 justify-center items-center">
          <Label>
            Background:
            <textarea placeholder="Enter Background"></textarea>
          </Label>
          <Label>
            Backstory:
            <textarea placeholder="Enter Backstory"></textarea>
          </Label>
          <Label>
            Personality Traits:
            <textarea placeholder="Enter Personality Traits"></textarea>
          </Label>
        </div>
        <div className="flex gap-8 justify-center items-center">
          <Label>
            Choose Starting Equipment:
            <textarea placeholder="Enter Starting Equipment"></textarea>
          </Label>
        </div>
        <div className="flex gap-8 justify-center items-center">
          <Label>
            {/* THE API ONLY HAS THE ACOLYTE BACKGROUND, I'M GOING TO ASSUME WIZARDS OF THE COAST IS PROTECTIVE OF THIER BACKGROUNDS. 
            That being said, people should be able to make thier own (the api does allow that). So if we trust that they api owners 
            know what their doing, which I believe is the case - then this should be fine for now until we have a clearer image of the 
            legal ramifications from people using copyrighted material. */}
            Background Description:
            <textarea placeholder="Enter character description"></textarea>
          </Label>
        </div>
      </div>
      <div className="flex gap-8 justify-center items-center">
        <SubmitButton
          pendingText="Saving Character Data..."
          onClick={handleSubmit}
        >
          Save Character Data
        </SubmitButton>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
