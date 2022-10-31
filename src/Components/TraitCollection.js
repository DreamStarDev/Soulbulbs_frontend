import '../App.css';
import '../responsive.css';
import { useState, useEffect } from 'react';
import { useAppContext } from '../Context/state';
import classnames from 'classnames';

const TraitCollection = (props) => {
    const [images, setImages] = useState([]);
    const appContext = useAppContext();

    const importAll = (r) => {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    useEffect(() => {
        const directories = {
            'background': require.context('../images/background', false, /\.(png|jpe?g|svg)$/),
            'body': require.context('../images/body', false, /\.(png|jpe?g|svg)$/),
            'bulb': require.context('../images/bulb', false, /\.(png|jpe?g|svg)$/),
            'glasses': require.context('../images/glasses', false, /\.(png|jpe?g|svg)$/),
            'hat': require.context('../images/hat', false, /\.(png|jpe?g|svg)$/),
            'overhead': require.context('../images/overhead', false, /\.(png|jpe?g|svg)$/)
        }
        let imgList = importAll(directories[props.trait]);
        setImages(Object.keys(imgList));
    }, []);

    const onClickTrait = (path) => {
        let pathObj = appContext.traitPath;
        if (props.trait == 'background') {
            pathObj.background = pathObj.background == path ? '' : path;
        } else if (props.trait == 'body') {
            pathObj.body = pathObj.body == path ? '' : path;;
        } else if (props.trait == 'bulb') {
            pathObj.bulb = pathObj.bulb == path ? '' : path;;
        } else if (props.trait == 'glasses') {
            pathObj.glasses = pathObj.glasses == path ? '' : path;
        } else if (props.trait == 'hat') {
            pathObj.hat = pathObj.hat == path ? '' : path;
        } else if (props.trait == 'overhead') {
            pathObj.overhead = pathObj.overhead == path ? '' : path;
        }

        appContext.setTraitPath({...appContext.traitPath});
    }

    const isSelected = (img) => {
        let pathObj = appContext.traitPath;
        if (props.trait == 'background') {
            return (pathObj.background == img && img != '' ? true : false);
        } else if (props.trait == 'body') {
            return (pathObj.body == img && img != '' ? true : false);
        } else if (props.trait == 'bulb') {
            return (pathObj.bulb == img && img != '' ? true : false);
        } else if (props.trait == 'glasses') {
            return (pathObj.glasses == img && img != '' ? true : false);
        } else if (props.trait == 'hat') {
            return (pathObj.hat == img && img != '' ? true : false);
        } else if (props.trait == 'overhead') {
            return (pathObj.overhead == img && img != '' ? true : false);
        }
    }

    return (
        <>
            {
                images.map((img, index) => (
                    <div className="col-md-3 cardsAll" key={index} onClick={() => onClickTrait(img)}>
                        <figure className={classnames('', {
                            'selected' : isSelected(img)
                        })}>
                            <img src={'images/' + props.trait + '/' + img} />
                        </figure>
                        <figcaption>
                            <p className='text-dark font-weight-bold'>{(img.split('.')[0]).split('_')[1]} </p>
                        </figcaption>
                    </div>
                ))
            }
        </>
    )
}

export default TraitCollection;