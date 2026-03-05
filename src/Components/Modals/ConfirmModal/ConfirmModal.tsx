import './ConfirmModal.css';
import {motion} from "framer-motion";
const ConfirmModal = ({confirmNo, confirmYes}: any) => {
    return (
            <div className='confirm-modal-overlay'>
                <motion.div initial={{opacity: 0, translateY: 30, rotateX: 90}} animate={{opacity: 1, translateY: 0, rotateX: 0}} transition={{duration: 0.2}}>
                    <div className='confirm-modal'>
                        <h1>Очистить все задачи?</h1>

                        <div className="buttons">
                            <button className='confirm-btn' onClick={() => confirmNo()}>Отмена</button>
                            <button className='confirm-btn' onClick={() => confirmYes()}>Да</button>
                        </div>
                    </div>
                </motion.div>
            </div>
    );
};

export default ConfirmModal;