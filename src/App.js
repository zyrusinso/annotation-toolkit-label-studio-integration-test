import React, { useState } from "react";
import { AppShell, Layer } from "annotation-toolkit";
import { useStore } from "global-context-store";
import LabelStudio from "label-studio";

export default function App() {
  // Set a default layer to be selected on start:
  const { set } = useStore();
  React.useEffect(() => {
    set(["selectedLayer"], ["Label Studio Test"]);
  }, [set]);

  return (
    <div style={{ height: "100vh" }}>
      {/* The tool needs to be wrapped in a global store (e.g. <Store />). The store */}
      {/* is how components within the App "talk" to each other through a global state object. */}
      <AppShell
        layers={() => (
          <Layer
            displayName="Label Studio Test"
            icon="layer"
            component={() => <LabelStudioTest />}
          />
        )}
      />
    </div>
  );
}

function LabelStudioTest() {
  const [selected, setSelected] = useState(false);
  React.useEffect(() => {
    new LabelStudio("label-studio", {
      config: `
        <View>
        <PolygonLabels name="tag" toName="img">
            <Label value="Hello"></Label>
            <Label value="World"></Label>
          </PolygonLabels>
          <Image name="img" value="$image"></Image>
        </View>
      `,

      interfaces: [
        "panel",
        "update",
        "submit",
        "controls",
        "side-column",
        // "annotations:menu",
        // "annotations:add-new",
        // "annotations:delete"
        // "predictions:menu"
      ],

      user: {
        pk: 1,
        firstName: "James",
        lastName: "Dean",
      },

      task: {
        annotations: [],
        predictions: [],
        id: 1,
        data: {
          image:
            "https://imgs.search.brave.com/SbLRr1ApbOn4OKzxZmtjjCTiprG5_iw5ywqJxr-qUOs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvNDAz/MzE0OC9wZXhlbHMt/cGhvdG8tNDAzMzE0/OC5qcGVnP2F1dG89/Y29tcHJlc3MmY3M9/dGlueXNyZ2ImZHBy/PTEmdz01MDA",
        },
      },

      onLabelStudioLoad: function (LS) {
        var c = LS.annotationStore.addAnnotation({
          userGenerate: true,
        });
        LS.annotationStore.selectAnnotation(c.id);
      },
      onSubmitAnnotation: function (LS, annotation) {
        // retrive an annotation
        console.log(annotation.serializeAnnotation());
        setSelected(!selected);
      },
    });
  }, []);

  return (
    <div
      id="label-studio"
      style={{
        backgroundColor: "white",
        padding: 10,
        height: "calc(100vh - 250px)",
        overflowY: "scroll",
      }}
    ></div>
  );
}
