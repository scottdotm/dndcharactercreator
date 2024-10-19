"use client";
import { Label } from "./ui/label";
import { SubmitButton } from "@/components/submit-button";
import { FormMessage, Message } from "@/components/form-message";
import { submitCharacterSheet } from "@/app/actions";
import React, { useState, useEffect } from "react";
import { ApiOutput } from "@/app/api/interface/api";
import { getAlignments } from "../app/api/5eSRD"; // Import the getAlignments function

export default function CharacterSheet() {
  const [alignments, setAlignments] = useState<ApiOutput[]>([]);
  const [isLoadingAlignments, setIsLoadingAlignments] = useState(true);
  const [selectedAlignment, setSelectedAlignment] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAlignments = async () => {
      try {
        const alignments = await getAlignments();
        setAlignments(alignments);
        console.log("Alignments set in state:", alignments);
      } catch (error) {
        console.error("Error fetching alignments:", error);
        setErrorMessage("Failed to load alignments. Please try again later.");
      } finally {
        setIsLoadingAlignments(false);
      }
    };

    fetchAlignments();
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
    <>
      <div className="flex gap-8 justify-center items-center">
        <h1>DnD Character Sheet</h1>
      </div>
      <div className="flex gap-8 justify-center items-center">
        <div className="flex gap-8 justify-center items-center">
          <Label>
            Please select character alignment:
            <>
              {isLoadingAlignments ? (
                <p>Loading alignments...</p>
              ) : alignments.length > 0 ? (
                <select
                  value={selectedAlignment}
                  onChange={(e) => setSelectedAlignment(e.target.value)}
                >
                  <option value="">Select an alignment</option>
                  {alignments.map((alignment) => (
                    <option key={alignment.index} value={alignment.index}>
                      {alignment.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p>No alignments found.</p>
              )}
            </>
          </Label>
        </div>
        <div>
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
        <textarea placeholder="Enter character description"></textarea>
        <SubmitButton
          pendingText="Saving Character Data..."
          onClick={handleSubmit}
        >
          Save Character Data
        </SubmitButton>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </>
  );
}
