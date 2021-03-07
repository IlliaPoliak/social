
export type DialogsInitialStateType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>,
}
type DialogType = { id: number, name: string }
type MessageType = { id: number, text: string }

let initialState: DialogsInitialStateType = {
    dialogs: [
        { id: 199091, name: 'Illia Poliak' },
        { id: 222333, name: 'Tat Poliak' },
        { id: 334567, name: 'Serg Poliak' },
        { id: 434665, name: 'Michel' },
        { id: 527564, name: 'John' }
    ],
    messages: [
        { id: 123, text: 'Test text' },
        { id: 321, text: 'Test text' },
        { id: 213, text: 'Test text' },
        { id: 456, text: 'Test text' },
        { id: 754, text: 'JTest text' }
    ]
}

export const dialogsReducer = (state = initialState, action: ActionsType): DialogsInitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, { id: 564, text: action.newMessageBody }],
            }

        default: return state;
    }
}


// CONSTANTS

const ADD_MESSAGE = 'dialogsReducer/ADD_MESSAGE';

// ACTIONS

type ActionsType = AddMessageType

type AddMessageType = {
    type: typeof ADD_MESSAGE,
    newMessageBody: string
}

export const addMessage = (newMessageBody: string): AddMessageType => ({
    type: ADD_MESSAGE,
    newMessageBody
})