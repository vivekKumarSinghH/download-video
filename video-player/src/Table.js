import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReactPlayer from 'react-player';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { saveAs } from 'file-saver';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function DataTable({ fileNames }) {
  
    const [playingVideo, setPlayingVideo] = React.useState([])
    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Video</StyledTableCell>
                        <StyledTableCell >Action</StyledTableCell>
                        <StyledTableCell >Download</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fileNames.map((file) => (
                        <StyledTableRow key={file.id} >
                            <StyledTableCell component="th" scope="row"

                            >
                                <ReactPlayer
                                    width={"32rem"}
                                    height={"16rem"}
                                    muted={true} playing={playingVideo.includes(file.file_name)} url={`http://180.151.22.222:93/videos/2022-09-14/${file.file_name}`} />
                            </StyledTableCell>

                            <StyledTableCell  >{
                                playingVideo.includes(file.file_name) ? <IconButton onClick={() => {
                                    let pause = playingVideo.filter((ele) => ele != file.file_name)
                                    setPlayingVideo(pause)
                                }}>
                                    <PauseIcon fontSize='large' />
                                </IconButton> : <IconButton onClick={() => {
                                    setPlayingVideo((prev) => [...prev, file.file_name])
                                }}>
                                    <PlayArrowIcon fontSize='large' />
                                </IconButton>
                            }
                            </StyledTableCell>
                            <StyledTableCell  > 
                                 <IconButton onClick={() => {
                                    saveAs(`http://180.151.22.222:93/videos/2022-09-14/${file.file_name}`,file.file_name)
                                    }}>

                                    <ArrowDownwardIcon fontSize='large' />
                                </IconButton>
                            
                            </StyledTableCell>

                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
