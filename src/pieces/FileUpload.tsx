import React, { useState, ChangeEvent } from "react";

const FileUpload: React.FC = () => {
    const [fileContent, setFileContent] = useState<string>("");
    const [userIDs, setUserIDs] = useState<string[]>([]);

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target && typeof e.target.result === "string") {
                    const content = e.target.result;
                    setFileContent(content);

                    // Regular expression to match the user ID format and extract the last 3 digits
                    const regex = /[a-z]\d[a-z]\d_(\d{3})/gi;
                    const matches = Array.from(
                        content.matchAll(regex),
                        (match) => match[1]
                    );
                    setUserIDs(matches);
                }
            };

            reader.readAsText(file);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Upload a Text File to Extract User IDs
                </h2>
                <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />
                {userIDs.length > 0 && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg max-h-48 overflow-y-auto">
                        <h3 className="text-xl font-medium text-gray-700 mb-2 text-center">
                            Extracted User IDs (Last 3 Digits):
                        </h3>
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                            {userIDs.map((id, index) => (
                                <li key={index}>{id}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {fileContent && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg max-h-48 overflow-y-auto">
                        <h3 className="text-xl font-medium text-gray-700 mb-2 text-center">
                            Full File Content:
                        </h3>
                        <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                            {fileContent}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
