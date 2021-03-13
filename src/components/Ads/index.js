import React, { useState, useContext, useEffect, useRef } from "react";
import { FirebaseContext } from "../Firebase";
import Loader from "../Loader";
import Logout from "../Logout";
import { Form } from "semantic-ui-react";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";

const Ads = (props) => {
  const firebase = useContext(FirebaseContext);
  const uploadRef = useRef();

  const categorieOptions = [
    { key: "hotel", value: "hotels", text: "Hotel" },
    { key: "restaurant", value: "restaurants", text: "Restaurant" },
    { key: "voyage", value: "voyages", text: "Voyage" },
    { key: "sites", value: "sites", text: "Site" },
    { key: "bienetre", value: "bienetre", text: "Bien-être" },
    { key: "hebergements", value: "hebergements", text: "Hébergement" },
  ];

  const initialData = {
    type: "",
    title: "",
    description: "",
    price: "",
    facebook: "",
    instagram: "",
    phone: "",
    uid: props.location.state,
    images: [],
  };

  const [adminSession, setadminSession] = useState(null);
  const [adsData, setAdsData] = useState(initialData);
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const { title, description, price, facebook, instagram, phone } = adsData;
  const [isReady, setIsReady] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []);

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setadminSession(user) : props.history.push("/");
    });
    return () => {
      listener();
    };
  }, [adminSession, firebase, props.history, selectedType]);

  const handleCategorieChange = (e, data) => {
    e.preventDefault();
    setSelectedType(data.value);
    setAdsData({ ...adsData, type: data.value });
  };

  const insertData = () => {
    const categorieCollection = firebase.dataCollection(selectedType);
    categorieCollection
      .add(adsData)
      .then((res) => {
        /**props.history.push({
          pathname: "/uploadPage",
          state: { adsId: res.id, categorie: selectedType },
        });**/
        handleUploadStart(res.id);
      })
      .catch((error) => {
        setError(error);
        setAdsData({ ...adsData });
      });
  };

  const handleProgress = (progress) => {
    setUploadProgress(progress);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    insertData();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setAdsData({ ...adsData, [e.target.id]: e.target.value });
  };

  const updateUsersUrl = async (id, url) => {
    const usersCollection = firebase.dataCollection(selectedType);
    const userRef = usersCollection.doc(id);
    await userRef.update({ images: firebase.updateField(url) });
  };
  const urls = [];

  const handleUploadStart = (id) => {
    let progress = 0;
    let count = 0;
    uploadRef.current.state.files.forEach((element) => {
      count++;
      const uploadTask = firebase.storageRef(element.name).put(element);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          handleProgress(progress);
          setLoading(true);
        },
        (error) => {
          // Handle unsuccessful uploads
          setError(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            urls.push(downloadURL);
            updateUsersUrl(id, downloadURL);
          });
          count--;
          if (count === 0) {
            setLoading(false);
            props.history.push({
              pathname: "/home",
            });
          }
        }
      );
    });
    setUploadProgress(0);
  };

  // gestion d'erreurs
  const errorMsg = error !== "" && <span>{error.message}</span>;

  const valideBtn =
    selectedType === "" ||
    title === "" ||
    description === "" ||
    price === "" ||
    phone === "" ||
    isReady !== true ? (
      <Button disabled>Valider</Button>
    ) : (
      <Button type="submit">Valider</Button>
    );

  return adminSession === null ? (
    <Loader loadingMsg={"Authentification ..."} />
  ) : loading ? (
    <Loader loadingMsg={"Uploading ..."} />
  ) : (
    <div>
      <Logout className="logoutContainer" />
      <h2>Nouvelle annonce</h2>
      {errorMsg}
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Select
            fluid
            id="type"
            label="Catégorie"
            placeholder="Catégorie"
            options={categorieOptions}
            onChange={handleCategorieChange}
            search
            selection
            required
          />
          <Form.Input
            fluid
            id="title"
            label="Title"
            placeholder="Titre"
            onChange={handleChange}
            value={title}
            required
          />
          <Form.Input
            fluid
            id="description"
            label="Description"
            placeholder="Description"
            onChange={handleChange}
            value={description}
            required
          />
          <Form.Input
            fluid
            id="price"
            label="Prix"
            placeholder="Prix"
            onChange={handleChange}
            value={price}
            required
          />
          <Form.Input
            fluid
            id="facebook"
            label="Facebook"
            placeholder="Facebook"
            onChange={handleChange}
            value={facebook}
          />
          <Form.Input
            fluid
            id="instagram"
            label="Instagram"
            placeholder="Instagram"
            onChange={handleChange}
            value={instagram}
          />
          <Form.Input
            fluid
            id="phone"
            label="Numéro de telephone"
            placeholder="Numéro de telephone"
            onChange={handleChange}
            value={phone}
            required
          />
          <FileUpload
            ref={uploadRef}
            className="p-mb-3"
            auto
            customUpload
            multiple
            maxFileSize={10000000}
            accept="image/*"
            onSelect={() => setIsReady(true)}
            chooseLabel="Ajouter des images"
          />
          <ProgressBar className="p-mb-4" value={uploadProgress} />
          {valideBtn}
        </Form>
      </div>
    </div>
  );
};

export default Ads;
