use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct DecodedPng {
    data: Vec<u8>,
    width: u32,
    height: u32,
}

#[wasm_bindgen]
impl DecodedPng {
    #[wasm_bindgen(js_name = dataLength)]
    pub fn data_length(&self) -> usize {
        self.data.len()
    }

    #[wasm_bindgen(js_name = dataPtr)]
    pub fn data_ptr(&self) -> *const u8 {
        self.data.as_ptr()
    }

    pub fn width(&self) -> u32 { self.width }
    pub fn height(&self) -> u32 { self.height }
}

#[wasm_bindgen]
pub fn decode(image: &[u8]) -> Result<DecodedPng, JsValue> {
    let decoder = png::Decoder::new(image);
    let (info, mut reader) = match decoder.read_info() {
        Ok(t) => t,
        Err(err) => return Err(js_sys::Error::new(&format!("{}", err)).into()),
    };

    let mut data = vec![0; info.buffer_size()];
    if let Err(err) = reader.next_frame(&mut data) {
        return Err(JsValue::from_str(&format!("{}", err)));
    }
    
    Ok(DecodedPng {
        data,
        width: info.width,
        height: info.height,    
    })
}
