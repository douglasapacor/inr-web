import {
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper
} from "@mui/material"
import { FC } from "react"
import { contentListType, customListType } from "./types"

const TransferList: FC<customListType> = ({ ...props }) => {
  return (
    <Paper sx={{ width: 300, height: 330, overflow: "auto" }}>
      <List dense component="div" role="list">
        {props.content.map((item: contentListType) => {
          return (
            <ListItemButton
              key={`transfer-list-item-${item.id}-item-button`}
              role="listitem"
            >
              <ListItemIcon>
                <Checkbox
                  checked={props.checked.includes(item)}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": `transfer-list-item-${item.id}-label`
                  }}
                />
              </ListItemIcon>

              <ListItemText
                id={`transfer-list-item-${item.id}-label`}
                primary={item.name}
              />
            </ListItemButton>
          )
        })}
      </List>
    </Paper>
  )
}

export default TransferList
