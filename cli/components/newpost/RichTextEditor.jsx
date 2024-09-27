import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { theme } from '../../constants/theme';
const RichTextEditor = ({ editorRef, onChange }) => {
    return (
        <View style={styles.container}>
            <RichToolbar
                actions={[
                    actions.setStrikethrough,
                    actions.removeFormat,
                    actions.setBold,
                    actions.setItalic,
                    actions.insertImage,
                    actions.insertOrderedList,
                    actions.insertLink,
                    actions.keyboard,
                    actions.setUnderline,
                    actions.insertVideo,
                    actions.checkboxList,
                    actions.undo,
                    actions.redo,
                ]}
                style={styles.richBar}
                editor={editorRef}
                flatContainerStyle={styles.flatStyle}
                disabled={false}
            />
            <RichEditor
                ref={editorRef}
                containerStyle={styles.rich}
                editorStyle={styles.contentStyle}
                placeholder='Enter your content'
                onChange={onChange}
            />
        </View>
    )
}

export default RichTextEditor

const styles = StyleSheet.create({
    container: {
        minHeight: 285
    },
    richBar: {
        borderColor: '#efefef',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopRightRadius: theme.radius.xl,
        borderTopLeftRadius: theme.radius.xl,
    },
    flatStyle: {
        paddingHorizontal: 12,
    },
    rich: {
        minHeight: 240,
        flex: 1,
        borderWidth: 1.5,
        borderTopWidth: 0,
        borderBottomLeftRadius: theme.radius.xl,
        borderBottomRightRadius: theme.radius.xl,
        borderColor: theme.colors.gray,
        padding: 5

    }
})