import React from "react";
import RegexTester from "./RegexTester";

const RegexQuestion: React.FC = () => {
    interface Pattern {
        title: string;
        pattern: RegExp;
    }

    const regexList: Pattern[] = [
        {
            title: "Strings with lowercase letters followed by a 2-4 digit number",
            pattern: /^[a-z]+ \d{2,4}$/,
        },
        {
            title: "Strings starting with an uppercase letter, followed by at least one lowercase letter",
            pattern: /^[A-Z][a-z]+$/,
        },
        {
            title: "Strings with two consecutive repeated words",
            pattern: /\b(\w+)\b \b\1\b/,
        },
        {
            title: "Strings with both the words 'hedge' and 'fund'",
            pattern: /\bhedge\b.*\bfund\b|\bfund\b.*\bhedge\b/,
        },
        {
            title: "All binary strings except the empty string (sequence of 0s or 1s)",
            pattern: /^[01]+$/,
        },
        {
            title: "Binary strings containing at least three 1s",
            pattern: /^[01]*1[01]*1[01]*1[01]*$/,
        },
        {
            title: "Binary strings of odd length",
            pattern: /^[01]{1}(?:[01]{2})*$/,
        },
        {
            title: "Binary strings that start and end with the same character",
            pattern: /^(0|1)[01]*\1$/,
        },
        {
            title: "Binary strings with the number of 0s as a multiple of 3",
            pattern: /^(?:[01]*0[01]*0[01]*0)*[01]*$/,
        },
        {
            title: "Binary strings that start with 0 and have an odd length, or start with 1 and have an even length",
            pattern: /^(0[01]*(?:[01]{2})*|1[01]*(?:[01]{2})+)$/,
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center py-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-indigo-700">
                Regular Expressions Tester
            </h1>

            {/* Grid container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
                {regexList.map(({ pattern, title }: Pattern, index) => (
                    <RegexTester
                        regexPattern={pattern}
                        key={index}
                        title={title}
                    />
                ))}
            </div>
        </div>
    );
};

export default RegexQuestion;
