import imageCompression from 'browser-image-compression';

const imageUploadCallback = (file: File) => {
  return new Promise(async (resolve) => {
    const compressionOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 550,
      useWebWorker: true
    };
    const reader = new FileReader();
    const compressedFile = await imageCompression(file, compressionOptions);

    reader.onloadend = async ({ target }: ProgressEvent<FileReader>) => {
      if (target) {
        resolve({ data: { link: target.result } });
      }
    };

    reader.readAsDataURL(compressedFile);
  });
};

export const toolbarConfig = {
  options: ['inline', 'blockType', 'list', 'textAlign', 'image'],
  inline: {
    options: ['bold', 'italic', 'underline', 'strikethrough']
  },
  blockType: {
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Code']
  },
  list: {
    options: ['unordered', 'ordered']
  },
  textAlign: {
    options: ['left', 'center', 'right', 'justify']
  },
  image: {
    uploadEnabled: true,
    urlEnabled: false,
    previewImage: true,
    alignmentEnabled: true,
    uploadCallback: imageUploadCallback,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: { present: false, mandatory: false }
  }
};
