package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.model.Image;
import com.predu.evertask.util.ImageUtil;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public class ImageMapper {
    public String imageToString(Image value) {
        if (value != null) {
            StringBuilder stringBuilder = new StringBuilder();

            String dataString = ImageUtil.toBase64(
                    ImageUtil.decompressBytes(value.getPicByte()));

            stringBuilder
                    .append("data:")
                    .append(value.getType())
                    .append(";base64,")
                    .append(dataString);

            return stringBuilder.toString();
        }

        return null;
    }
}
