package in.codemaniac.brainfk;
import java.io.IOException;

import javax.servlet.http.*;

import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Key;

@SuppressWarnings("serial")
public class BrainfuckServlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println("Hello, world");
		Key customerKey = KeyFactory.createKey("Customer", "your name");
		System.out.println(customerKey.getId());
	}
}
