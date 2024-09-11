import React, { useState, useEffect } from "react";

// Define the props type
interface RegexTesterProps {
    title: string;
    regexPattern: RegExp;
}

const RegexTester: React.FC<RegexTesterProps> = ({ title, regexPattern }) => {
    const [regex, setRegex] = useState<RegExp | null>(null);
    const [testStringInput, setTestStringInput] = useState<string | undefined>(
        undefined
    );
    const [delimiter, setDelimiter] = useState(",");

    useEffect(() => {
        try {
            const compiledRegex = new RegExp(regexPattern);
            setRegex(compiledRegex);
        } catch (e) {
            console.error("Invalid regex pattern", e);
            setRegex(null);
        }
    }, [regexPattern]);

    const testStrings = testStringInput?.split(delimiter);

    const getMatchResult = (testString: string): boolean => {
        if (!regex) return false;
        return regex.test(testString);
    };

    const handleTestStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTestStringInput(e.target.value);
    };

    const handleDelimiterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDelimiter(e.target.value);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
            <h2 className="text-xl font-bold mb-4 text-indigo-600">{title}</h2>
            <code className="bg-gray-100 text-gray-800 p-4 rounded-md block mb-6 font-mono text-sm">
                {regexPattern.source}
            </code>

            {/* Input for test strings and delimiter */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter test strings (separated by delimiter):
                </label>
                <input
                    type="text"
                    value={testStringInput}
                    onChange={handleTestStringChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter delimiter character:
                </label>
                <input
                    type="text"
                    value={delimiter}
                    onChange={handleDelimiterChange}
                    maxLength={1} // Limit input to a single character
                    className="w-16 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Test Results
            </h3>
            <ul className="space-y-3">
                {testStrings?.map((testString, index) => {
                    const isMatch = getMatchResult(testString);
                    return (
                        <li
                            key={index}
                            className={`p-4 rounded-md border text-sm ${
                                isMatch
                                    ? "bg-green-50 text-green-700 border-green-500"
                                    : "bg-red-50 text-red-700 border-red-500"
                            }`}
                        >
                            <span className="font-bold">{testString}</span>
                            {isMatch ? " ✔️ Matches" : " ❌ Does not match"}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default RegexTester;
