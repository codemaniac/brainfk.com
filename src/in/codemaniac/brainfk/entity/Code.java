package in.codemaniac.brainfk.entity;

import com.google.appengine.api.datastore.Text;

public final class Code {
	
	private final Text code;
	
	public Code(final Text code) {
		this.code = code;
	}

	public Text getCode() {
		return code;
	}	
}
