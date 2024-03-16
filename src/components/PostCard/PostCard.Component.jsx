/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserData } from "../../utils/Firebase Utils Functions";
import { truncateText } from "../../utils";
import { Img } from "react-image";
import { useDeletePost } from "../../hooks/useDeletePost";
import { UserContext } from "../../context/AuthContext";
import { Heart, MessageProgramming } from "iconsax-react";
import { db } from "../../firebase/Firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import Button from "../Button/Button.component";
import translate from "translate";
import { franc } from "franc";

const PostCardComponent = ({ postDetail, communityId = null, postType }) => {

  const [author, setAuthor] = useState();
  const { deletePost, deleting } = useDeletePost();
  const { user } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState();
  const [isLiking, setIsLiking] = useState(false);
  const [translatedtext, setTranslatedText] = useState();
  // Mapping between franc keywords and ISO 639-1 language codes
  const languageMapping = {
    "cmn": "zh",
    "spa": "es",
    "eng": "en",
    "rus": "ru",
    "arb": "ar",
    "ben": "bn",
    "hin": "hi",
    "por": "pt",
    "ind": "id",
    "jpn": "ja",
    "fra": "fr",
    "deu": "de",
    "jav": "jv",
    "kor": "ko",
    "tel": "te",
    "vie": "vi",
    "mar": "mr",
    "ita": "it",
    "tam": "ta",
    "tur": "tr",
    "urd": "ur",
    "guj": "gu",
    "pol": "pl",
    "ukr": "uk",
    "kan": "kn",
    "mai": "mai",
    "mal": "ml",
    "pes": "fa",
    "mya": "my",
    "swh": "sw",
    "sun": "su",
    "ron": "ro",
    "pan": "pa",
    "bho": "bh",
    "amh": "am",
    "hau": "ha",
    "fuv": "ff",
    "bos": "bs",
    "hrv": "hr",
    "nld": "nl",
    "srp": "sr",
    "tha": "th",
    "ckb": "ku",
    "yor": "yo",
    "uzn": "uz",
    "zlm": "ms",
    "ibo": "ig",
    "npi": "ne",
    "ceb": "ceb",
    "skr": "skr",
    "tgl": "tl",
    "hun": "hu",
    "azj": "az",
    "sin": "si",
    "koi": "koi",
    "ell": "el",
    "ces": "cs",
    "mag": "mag",
    "run": "rn",
    "bel": "be",
    "plt": "mg",
    "qug": "qug",
    "mad": "mad",
    "nya": "ny",
    "zyb": "zyb",
    "pbu": "ps",
    "kin": "rw",
    "zul": "zu",
    "bul": "bg",
    "swe": "sv",
    "lin": "ln",
    "som": "so",
    "hms": "hms",
    "hnj": "hnj",
    "ilo": "ilo",
    "kaz": "kk",
    "uig": "ug",
    "hat": "ht",
    "khm": "km",
    "prs": "prs",
    "hil": "hil",
    "sna": "sn",
    "tat": "tt",
    "xho": "xh",
    "hye": "hy",
    "min": "min",
    "afr": "af",
    "lua": "lua",
    "sat": "sat",
    "bod": "bo",
    "tir": "ti",
    "fin": "fi",
    "slk": "sk",
    "tuk": "tk",
    "dan": "da",
    "nob": "nb",
    "suk": "su",
    "als": "sq",
    "sag": "sg",
    "nno": "nn",
    "heb": "he",
    "mos": "mos",
    "tgk": "tg",
    "cat": "ca",
    "sot": "st",
    "kat": "ka",
    "bcl": "bcl",
    "glg": "gl",
    "lao": "lo",
    "lit": "lt",
    "umb": "umb",
    "tsn": "tn",
    "vec": "vec",
    "nso": "nso",
    "ban": "ban",
    "bug": "bug",
    "knc": "knc",
    "kng": "kng",
    "ibb": "ibb",
    "lug": "lg",
    "ace": "ace",
    "bam": "bm",
    "tzm": "tzm",
    "ydd": "yi",
    "kmb": "kmb",
    "lun": "lun",
    "shn": "shn",
    "war": "war",
    "dyu": "dyu",
    "wol": "wo",
    "kir": "ky",
    "nds": "nds",
    "mkd": "mk",
    "vmw": "vmw",
    "zgh": "zgh",
    "ewe": "ee",
    "khk": "khk",
    "slv": "sl",
    "ayr": "ayr",
    "bem": "bem",
    "emk": "emk",
    "bci": "bci",
    "bum": "bum",
    "epo": "eo",
    "pam": "pam",
    "tiv": "tiv",
    "tpi": "tpi",
    "ven": "ve",
    "ssw": "ss",
    "nyn": "nyn",
    "kbd": "kbd",
    "iii": "ii",
    "yao": "yao",
    "lvs": "lv",
    "quz": "quz",
    "src": "sc",
    "rup": "rup",
    "sco": "sco",
    "tso": "ts",
    "men": "men",
    "fon": "fon",
    "nhn": "nhn",
    "dip": "dip",
    "kde": "kde",
    "kbp": "kbp",
    "tem": "tem",
    "toi": "toi",
    "ekk": "et",
    "snk": "snk",
    "cjk": "cjk",
    "ada": "ada",
    "aii": "aii",
    "quy": "quy",
    "rmn": "rmn",
    "bin": "bin",
    "gaa": "gaa",
    "ndo": "nd"
  };

  // Function to convert franc keyword to ISO 639-1 language code
  function francToISO(francKeyword) {
    // Check if the provided keyword exists in the mapping
    if (languageMapping.hasOwnProperty(francKeyword)) {
      // Return the corresponding ISO 639-1 language code
      return languageMapping[francKeyword];
    } else {
      // Return null if no mapping found
      return null;
    }
  }

  const [detectedLanguageCode, setDetectedLanguageCode] = useState()
  const translatePost = async (text) => {
    const res = franc(text)
    setDetectedLanguageCode(res)
    const detectedLanguage = francToISO(res)
    const translateText = await translate('come ti chiami', {
      from: detectedLanguage,
      to: "en",
    });

    console.log(translateText);
    setTranslatedText(translateText)


  }

  //listening to the realtime changes to likes of the post
  useEffect(() => {
    if (postType == "general") {
      onSnapshot(doc(db, "General Posts", postDetail.id), (doc) => {
        const likesArray = doc.data().Likes ?? [];
        setIsLiked(likesArray.includes(user.uid));
      });
    } else {
      onSnapshot(doc(db, "Community Posts", postDetail.id), (doc) => {
        const likesArray = doc.data().Likes ?? [];
        setIsLiked(likesArray.includes(user.uid));
      });
    }
  }, [postDetail, postType, user.uid]);
  const likeOrDislikePost = async (id) => {
    if (isLiking) return;
    setIsLiking(true);
    let postRef = null;

    if (postType == "general") {
      console.log("in general");
      postRef = doc(db, "General Posts", id);
    } else {
      console.log("in community post");
      postRef = doc(db, "Community Posts", id);
    }

    const snapshot = await getDoc(postRef);
    const likesArray = snapshot.data().Likes ?? [];

    if (isLiked) {
      //dislike the post
      const updatedLikesArray = likesArray.filter((item) => item != user.uid);
      await updateDoc(postRef, { Likes: updatedLikesArray });
      setIsLiked(false);
    } else {
      //likes the post
      likesArray.push(user.uid);
      await updateDoc(postRef, { Likes: likesArray });
      setIsLiked(true);
    }
    setIsLiking(false);
  };
  useEffect(() => {
    const getPostAuthor = async () => {
      const res = await getUserData(postDetail["Created By"]);
      setAuthor(res);
    };
    getPostAuthor();
  }, [postDetail]);

  return (
    <>
      {postDetail && (
        <div className="p-4   bg-primary dark:bg-darkCardBg rounded-xl shadow-lg">
          <div className="flex items-center justify-between  gap-4">
            <div className="flex items-center justify-center gap-4">
              <div style={{ width: 50, height: 50 }}>
                <Img
                  loader={
                    <div className="w-full h-full rounded-full skeleton"></div>
                  }
                  className="rounded-full w-full h-full "
                  src={author?.Avatar}
                  width={50}
                  height={50}
                />
              </div>
              <Link
                to={`/post/${postDetail["id"]}?type=${postType == "general" ? "general" : "community"
                  }`}
              >
                <h1 className="lg:text-lg text-md font-bold text-blAccent dark:text-accent ">
                  {postDetail?.Title}
                </h1>
                <span className="dark:text-textPrimary text-textSecondary">
                  By @{author?.Username}
                </span>
              </Link>
            </div>
            <div></div>
          </div>
          <div className="p-2">
            <h1 className="dark:text-textPrimary text-textSecondary">
              {postDetail.Description &&
                truncateText(postDetail?.Description, 100)}
            </h1>
          </div>
          <div className="carousel w-full">
            {postDetail["Media URL"] &&
              postDetail["Media URL"].map((url, index) => {
                return (
                  <div
                    id={`item${index + 1}`}
                    key={index}
                    className="carousel-item w-1/2 h-60 m-2 rounded-xl shadow  p-2 bg-gray-200 dark:bg-gray-700 "
                  >
                    {!url.split(".").pop().toLowerCase().includes("mp4") ? (
                      <img
                        src={url}
                        className="object-cover rounded-lg w-full h-full"
                      />
                    ) : (
                      <video
                        src={url}
                        className="w-full h-full rounded-xl"
                        controls
                      ></video>
                    )}
                  </div>
                );
              })}
          </div>
          {translatedtext && (
            <div className="p-2">
              <h1 className="dark:text-textPrimary text-textSecondary">{translatedtext}</h1>
            </div>
          )}
          {detectedLanguageCode !== 'eng' && (
            <Button
              onClickHandler={() => translatePost(postDetail.Description)}
            >
              Translate into English
            </Button>
          )}
          <div className="flex items-center justify-around  my-2   bg-slate-100 dark:bg-gray-800 rounded-xl p-2">
            <div className="flex items-center justify-center gap-2">
              <Heart
                aria-disabled={isLiking}
                onClick={() => likeOrDislikePost(postDetail.id)}
                size="20"
                variant={isLiked ? "Bold" : "Outline"}
                className="text-[#E1306C]"
              />
              <h1 className="text-[#E1306C]">
                {postDetail && postDetail["Likes"].length}{" "}
              </h1>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Link to={`/post/${postDetail["id"]}`}>
                <MessageProgramming
                  size="20"
                  className="dark:text-primary text-secondary"
                />
              </Link>
              <h1 className="dark:text-textPrimary text-textSecondary text-sm">
                0
              </h1>
            </div>
          </div>
          {postDetail["Created By"] == user.uid && (
            <Button
              onClickHandler={() =>
                deletePost(postDetail.id, communityId, postType)
              }
              isDisabled={deleting}
              outline={true}
            >
              <h1 className="text-warning">
                {deleting ? "Deleting..." : "Delete Post"}
              </h1>
            </Button>
          )}
        </div>
      )}
    </>
  );
};
export default PostCardComponent;
