import api from "../../utils/api";

class UploadFilesService {
    upload(files, event, onUploadProgress) {
        let formData = new FormData();
        formData.append('event', event);

        Array.from(files).map((file, index) => {
            formData.append('images', file)
        })

        return api.post("photo/add/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    getFiles() {
        return api.get("/photo/");
    }
}

export default new UploadFilesService();