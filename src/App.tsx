import FileUpload from "./pieces/FileUpload";
import Morphology from "./pieces/Morphology/Morphology";
import TabContentWrapper from "./pieces/TabContentWrapper";
import RegexQuestion from "./pieces/regex/RegexQuestion";
import WagnerFischer from "./pieces/wagnerfischer/WagnerFischer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function App() {
    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Tabs defaultValue="WagnerFischer" className="flex-grow">
                {/* Tabs list */}
                <TabsList className="flex justify-center bg-gray-200 p-4">
                    <TabsTrigger
                        value="WagnerFischer"
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white focus:outline-none"
                    >
                        Wagner-Fischer Algorithm
                    </TabsTrigger>
                    <TabsTrigger
                        value="regex"
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white focus:outline-none"
                    >
                        Regular Expressions
                    </TabsTrigger>
                    <TabsTrigger
                        value="Morphology"
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white focus:outline-none"
                    >
                        Morphology
                    </TabsTrigger>
                    <TabsTrigger
                        value="ID"
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white focus:outline-none"
                    >
                        ID Extractor
                    </TabsTrigger>
                </TabsList>

                {/* Content area */}
                <TabsContent value="WagnerFischer" className="flex-grow p-6">
                    <TabContentWrapper>
                        <WagnerFischer />
                    </TabContentWrapper>
                </TabsContent>
                <TabsContent value="regex" className="flex-grow p-6">
                    {/* <TabContentWrapper> */}
                    <RegexQuestion />
                    {/* </TabContentWrapper> */}
                </TabsContent>
                <TabsContent value="Morphology" className="flex-grow p-6">
                    {/* <TabContentWrapper> */}
                    <Morphology />
                    {/* </TabContentWrapper> */}
                </TabsContent>
                <TabsContent value="ID" className="flex-grow p-6">
                    <TabContentWrapper>
                        <FileUpload />
                    </TabContentWrapper>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default App;
