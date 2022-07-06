package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.model.Image;
import com.predu.evertask.util.ImageUtil;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public class ImageMapper {
    public String imageToString(Image value) {
        if (value != null) {
            return ImageUtil.toBase64(
                    ImageUtil.decompressBytes(value.getPicByte()));
        }

        return null;
    }
}
