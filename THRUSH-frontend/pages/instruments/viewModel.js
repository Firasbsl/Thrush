import { Card } from '@material-ui/core';
import dynamic from 'next/dynamic';
dynamic(() => import('@google/model-viewer'), { ssr: false });
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { BaseLayout } from "../../components/common/layout";


const style = {
    dispo: `flex w-full inline-block mt-5 justify-center items-center`,
    itemm: `flex inline-block`,
};

const itemData = [
    {
        mod: '/xiaotiqin.glb',
        name: 'xiaotiqin'
    },
    {
        mod: '/guitar.glb',
        name: 'guitar'
    },
    {
        mod: '/guitar2.glb',
        name: 'guitar2'
    },
    {
        mod: '/gangqin.glb',
        name: 'gangqin'
    },
    {
        mod: '/trumpet.gltf',
        name: 'trumpet'
    }
];


export default function ViewModel() {

    return (
        <ImageList className={style.dispo} sx={{ height: 800 }} cols={3} rowHeight={164}>
            {itemData.map((item) => {
                return (
                    <>
                        <Card>
                            <ImageListItem key={item.name} style={{ height: 320, width: 400 }}>
                                {(typeof window !== 'undefined') &&
                                    <model-viewer enable-pans className={style.itemm} 
                                    style={{ height: 320, width: 400 }} shadow-intensity="1" 
                                    camera-controls src={item.mod}>
                                    </model-viewer>
                                }
                            </ImageListItem>
                        </Card>
                    </>
                )
            })}
        </ImageList>
    );
}

ViewModel.Layout = BaseLayout;
