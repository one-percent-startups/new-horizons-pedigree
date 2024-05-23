import Pica from 'pica';

const pica = Pica();

const resizeImage = async (file: File): Promise<File> => {
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');

    const blob: Blob = await new Promise<Blob>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target) {
                img.src = e.target.result as string;
                img.onload = () => {
                    canvas.width = img.width / 2; // Resize factor
                    canvas.height = img.height / 2;
                    pica.resize(img, canvas)
                        .then(result => pica.toBlob(result, 'image/jpeg', 0.90))
                        .then(resolve)
                        .catch(error => {
                            console.error('Resize error:', error);
                            reject(error); // reject the promise in case of error
                        });
                };
                img.onerror = (error) => {
                    console.error('Image load error:', error);
                    reject(error); // reject the promise if image fails to load
                };
            } else {
                reject(new Error('FileReader error: no result')); // reject if FileReader has no result
            }
        };
        reader.onerror = (error) => {
            console.error('FileReader error:', error);
            reject(error); // reject the promise if FileReader encounters an error
        };
        reader.readAsDataURL(file);
    });

    return new File([blob], file.name, { type: 'image/jpeg' });
};

export default resizeImage;
