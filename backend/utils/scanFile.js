import NodeClam from "clamscan";

const getClamAV =
async () => {

  const clamscan =
    await new NodeClam().init({

      clamscan: {
        path:
          "/opt/homebrew/bin/clamscan"
      },

      preference:
        "clamscan"

    });

  return clamscan;

};

export default getClamAV;