import React from "react";

const Morphology: React.FC = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Homework: Morphology
                </h2>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        2.1 How many morphemes does the word "antiestablishment"
                        have? What are the morphemes?
                    </h3>
                    <p className="text-gray-600">
                        The word <strong>"antiestablishment"</strong> has{" "}
                        <strong>three morphemes</strong>:
                        <ul className="list-disc list-inside mt-2">
                            <li>
                                <strong>anti-</strong>: a prefix meaning
                                "against"
                            </li>
                            <li>
                                <strong>establish</strong>: the root meaning "to
                                set up"
                            </li>
                            <li>
                                <strong>-ment</strong>: a suffix that turns the
                                verb into a noun
                            </li>
                        </ul>
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        2.2 Explore the Chamorro language
                    </h3>

                    <h4 className="text-lg font-semibold text-gray-700 mt-4">
                        I. Root | Derived word
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 mt-2">
                        <li>adda "mimic" → aadda "mimicker"</li>
                        <li>kanno "eat" → kakanno "eater"</li>
                        <li>tuge "write" → tutuge "writer"</li>
                    </ul>
                    <p className="text-gray-600 mt-2">
                        <strong>Pattern:</strong> In this set, the derived words
                        are created by{" "}
                        <strong>doubling the initial syllable</strong> of the
                        root word, forming a noun that refers to a person
                        performing the action (agentive noun).
                    </p>

                    <h4 className="text-lg font-semibold text-gray-700 mt-4">
                        II. Root | Derived word
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 mt-2">
                        <li>atan "look at" → atanon "nice to look at"</li>
                        <li>sangan "tell" → sanganon "tellable"</li>
                        <li>chalek "laugh" → chalekon "laughable"</li>
                        <li>ngangas "chew" → ngangason "chewable"</li>
                    </ul>
                    <p className="text-gray-600 mt-2">
                        <strong>Pattern:</strong> The derived word is created by{" "}
                        <strong>adding the suffix "-on"</strong>, which turns
                        the root verb or action into an adjective describing
                        something as being nice to look at, tellable, laughable,
                        or chewable (adjectival).
                    </p>

                    <h4 className="text-lg font-semibold text-gray-700 mt-4">
                        III. Root | Derived word
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 mt-2">
                        <li>dankolo "big" → dankololo "very big"</li>
                        <li>bunita "pretty" → bunitata "very pretty"</li>
                    </ul>
                    <p className="text-gray-600 mt-2">
                        <strong>Pattern:</strong> The derived words are formed
                        by{" "}
                        <strong>
                            reduplication of the last part of the root
                        </strong>
                        , intensifying the adjective to indicate a stronger
                        degree (very).
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        English Gloss Changes
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                        <li>
                            <strong>I:</strong> Changes from{" "}
                            <strong>verb</strong> (action) to{" "}
                            <strong>noun</strong> (agent performing the action).
                        </li>
                        <li>
                            <strong>II:</strong> Changes from{" "}
                            <strong>verb</strong> (action) to{" "}
                            <strong>adjective</strong> (describing the quality
                            of being acted upon).
                        </li>
                        <li>
                            <strong>III:</strong> Changes from{" "}
                            <strong>adjective</strong> to a more{" "}
                            <strong>intense adjective</strong> (intensified
                            description).
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Morphology;
